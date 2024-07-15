import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  Club,
  ClubSettings,
  ClubInvitationLink,
  ClubBannedAndKickedUsers,
  ClubAttemptsLogin,
} from '@lib/entities';
import { CustomRpcException } from '@lib/exception';
import { ClubSettingsDto } from './dtos/ClubSettings.dto';
import { CreateClubDto } from './dtos/CreateClub.dto';
import { lastValueFrom } from 'rxjs';
import { GetClubDto } from './dtos/GetClub.dto';
import { GetClubsDto } from './dtos/GetClubs.dto';
import { JoinToClubDto } from './dtos/JoinToClub.dto';
import { BanOrKickDto, clubType } from './dtos/BanOrKick.dto';
import { ListBanOrKickDto } from './dtos/ListBanOrKick.dto';
import { formatDate, getRandomNumber } from './club.utils';
import { GenerateLinkDto } from './dtos/GenerateLink.dto';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubBannedAndKickedUsers)
    private clubBannedAndKickedUsersRepository: Repository<ClubBannedAndKickedUsers>,
    @InjectRepository(Club) private clubRepository: Repository<Club>,
    @InjectRepository(ClubAttemptsLogin)
    private clubAttemptsLoginRepository: Repository<ClubAttemptsLogin>,
    @InjectRepository(ClubInvitationLink)
    private clubInvitationRepository: Repository<ClubInvitationLink>,
    @InjectRepository(ClubSettings)
    private clubSettingsRepository: Repository<ClubSettings>,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) { }

  async createClub(data: CreateClubDto): Promise<Club> {
    try {
      const {
        type,
        workHours,
        defaultRole,
        coinRation,
        name,
        localization,
        description,
        chatLink,
        channelLink,
        slogan,
        img,
      } = data.createClubDto;
      const { userId } = data.user;
      const observable = this.natsClient.send('getUserInfoById', {
        id: userId,
      });
      const user = await lastValueFrom(observable);

      if (!!user.club) {
        throw new CustomRpcException(409, 'First you need leave from the club');
      }

      const settings = await this.createClubSettings({
        type,
        workHours,
        defaultRole,
        coinRation,
      });
      const code = getRandomNumber(10000, 99999);

      const clubParams = {
        img,
        name,
        localization,
        description,
        chatLink,
        channelLink,
        slogan,
        ownerId: userId,
        settings,
        code,
      };

      const club = await this.clubRepository.save(clubParams);
      user.roles.push('clubAdmin');
      const roles = new Set(user.roles);

      await lastValueFrom(
        this.natsClient.send('updateUser', {
          id: user.id,
          club: club.id,
          roles: Array.from(roles),
        }),
      );

      return club;
    } catch (error) {
      throw error;
    }
  }

  async createClubSettings(settings: ClubSettingsDto): Promise<ClubSettings> {
    try {
      return await this.clubSettingsRepository.save(settings);
    } catch (error) {
      throw error;
    }
  }

  async getClubParam(param: GetClubDto): Promise<Club> {
    try {
      const query = this.clubRepository
        .createQueryBuilder('club')
        .leftJoinAndSelect('club.settings', 'settings');
      if (param.hasOwnProperty('id')) {
        query.where('club.id =:id', param);
      }
      if (param.hasOwnProperty('name')) {
        query.where('club.name =:name', param);
      }

      const club = await query.getOne();

      if (!club && param?.type !== 'create')
        throw new CustomRpcException(404, 'Club not found');
      return club;
    } catch (error) {
      throw error;
    }
  }

  async getClubs(params: GetClubsDto) {
    try {
      const { page = 1, sortBy, orderBy = 'DESC' } = params;

      const query = this.clubRepository
        .createQueryBuilder('club')
        .leftJoinAndSelect('club.settings', 'settings')
        .offset((page - 1) * 10)
        .limit(10);

      if (params?.name) query.where('club.name = :name', { name: params.name });
      if (params?.sortBy === 'totalUsers') {
        query
          .leftJoin('club.users', 'user')
          .addSelect('COUNT(user.id)', `${sortBy}`)
          .groupBy('club.id')
          .addGroupBy('settings.id')
          .orderBy(`"${sortBy}"`, orderBy);
      }
      if (params?.sortBy === 'totalGames') {
      }

      const clubs = await query.getRawMany();
      const totalClubs = await query.getCount();

      return { clubs, totalClubs };
    } catch (error) {
      throw error;
    }
  }

  async joinClub(data: JoinToClubDto): Promise<string> {
    try {
      const user = await lastValueFrom(
        this.natsClient.send('getUserInfoById', {
          id: data.user,
        }),
      );
      const date = new Date();
      if (!!user.club) {
        throw new CustomRpcException(409, 'First you need leave from the club');
      }

      const banKickList = await this.getBanOrKickList({
        clubId: data.club,
        userId: data.user,
      });

      if (banKickList.length > 0) {
        banKickList.forEach((item) => {
          if (item.list_period_to > date) {
            throw new CustomRpcException(
              403,
              `User is ${item.list_type}ed at this club to ${formatDate(item.list_period_to)}`,
            );
          }
        });
      }

      const club = await this.getClubParam({ id: data.club });
      if (club.settings.type === 'open') {
        await lastValueFrom(
          this.natsClient.send('updateUser', {
            id: data.user,
            club: data.club,
          }),
        );

        return 'You successfully joined to club';
      }

      if (club.code === data.code) {
        await lastValueFrom(
          this.natsClient.send('updateUser', {
            id: data.user,
            club: data.club,
          }),
        );
        return 'You successfully joined to club';
      } else {
        const attempt = await this.clubAttemptsLoginRepository
          .createQueryBuilder('attempt')
          .where('attempt.user_id = :user', {
            user: data.user,
          })
          .andWhere('attempt.club_id = :club', {
            club: data.club,
          })

          .getOne();
        let result;
        if (attempt) {
          result = (
            await this.clubAttemptsLoginRepository
              .createQueryBuilder()
              .update(ClubAttemptsLogin)
              .set({ tries: attempt.tries + 1 })
              .where('id = :id', { id: attempt.id })
              .returning('*')
              .execute()
          ).raw[0];
        } else {
          result = await this.clubAttemptsLoginRepository.save({
            user: user,
            club: club,
          });
        }

        const banPeriod = `${date.getDate()}-${date.getMonth()}-${date.getFullYear() + 1}`;
        if (result.tries > 10) {
          await this.banOrKick({
            user: data.user,
            club: data.club,
            bannedBy: club.ownerId,
            reason: 'to many incorrected tries to join',
            periodTo: banPeriod,
            type: clubType.ban,
          });
          throw new CustomRpcException(
            403,
            `User is banned at this club to ${banPeriod}`,
          );
        }
        return `You have ${10 - result.tries} left`;
      }
    } catch (error) {
      throw error;
    }
  }

  async getBanOrKickList(data: ListBanOrKickDto) {
    try {
      const query = this.clubBannedAndKickedUsersRepository
        .createQueryBuilder('list')
        .select('list')
        .where('list.club_id = :clubId', { clubId: data.clubId });

      if (data.type) {
        query.andWhere('list.type = :type', { type: data.type });
      }
      if (data.userId) {
        query.andWhere('list.user_id = :userId', { userId: data.userId });
      }
      return await query.getRawMany();
    } catch (error) {
      throw error;
    }
  }

  async banOrKick(data: BanOrKickDto) {
    try {
      const user = await lastValueFrom(
        this.natsClient.send('getUserInfoById', {
          id: data.user,
        }),
      );

      if (user.club?.id !== data.club) {
        throw new CustomRpcException(409, 'User doesn`t exist in this club');
      }

      await this.clubBannedAndKickedUsersRepository.save(data);

      await lastValueFrom(
        this.natsClient.send('updateUser', {
          id: data.user,
          club: null,
        }),
      );

      return await this.getAllClubMembers({ id: data.club });
    } catch (error) {
      throw error;
    }
  }

  async getClubSettings(id) {
    try {
      return await this.clubSettingsRepository.findOneBy(id);
    } catch (error) {
      throw error;
    }
  }

  async changeClubSettings(data) {
    try {
      return (
        await this.clubAttemptsLoginRepository
          .createQueryBuilder('settings')
          .update(ClubSettings)
          .where('id = :id', { id: data.id })
          .set({ ...data })
          .returning('*')
          .execute()
      ).raw[0];
    } catch (error) {
      throw error;
    }
  }

  async getAllClubMembers(id) {
    try {
      return await lastValueFrom(
        this.natsClient.send('findAllUsersInClub', id),
      );
    } catch (error) {
      throw error;
    }
  }

  async generateInviteLink(data: GenerateLinkDto): Promise<string> {
    try {
      const user = await lastValueFrom(
        this.natsClient.send('getUserInfoById', {
          id: data.createdBy,
        }),
      );
      const code = uuidv4();
      data.code = code;
      data.club = user.club;
      await this.clubInvitationRepository.save(data);
      return `${process.env.BACK_URL}/club/link/${code}`;
    } catch (error) {
      throw error;
    }
  }

  async joinByLink(data) {
    try {
      const invite = await this.clubInvitationRepository
        .createQueryBuilder('invite')
        .leftJoinAndSelect('invite.club', 'club')
        .where('invite.code = :code', {
          code: data.token,
        })
        .getOne();

      if (!invite) {
        throw new CustomRpcException(404, 'Link not found');
      }

      if (invite.status === 'expired') {
        throw new CustomRpcException(403, 'This link has expired');
      }

      const date = new Date();
      const period = new Date(invite.timePeriod);

      if (period < date) {
        await this.clubInvitationRepository.update(invite.id, {
          status: 'expired',
        });
        throw new CustomRpcException(403, 'This link has expired');
      }

      const user = await lastValueFrom(
        this.natsClient.send('getUserInfoById', {
          id: data.user,
        }),
      );

      if (!!user.club) {
        throw new CustomRpcException(409, 'First you need leave from the club');
      }
      user.roles.push(invite.role);
      const roles = new Set(user.roles);
      await lastValueFrom(
        this.natsClient.send('updateUser', {
          id: data.user,
          club: invite.club,
          role: Array.from(roles),
        }),
      );

      await this.clubInvitationRepository.update(invite.id, {
        totalInvited: invite.totalInvited + 1,
      });
      return 'Success';
    } catch (error) {
      throw error;
    }
  }
  async removeLink({ code }) {
    try {
      const invite = (
        await this.clubInvitationRepository
          .createQueryBuilder('club_invitation_links')
          .where('club_invitation_links.code = :code', {
            code,
          })
          .delete()
          .returning('*')
          .execute()
      ).raw[0];

      if (!invite) {
        throw new CustomRpcException(404, 'Link not found');
      }

      return 'Success';
    } catch (error) {
      throw error;
    }
  }
}
