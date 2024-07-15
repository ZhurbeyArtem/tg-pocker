import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@lib/entities';
import { Repository } from 'typeorm';
import { CustomRpcException } from '@lib/exception';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserInfoDto } from './dtos/UpdateUserInfo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) { }

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      const code = await lastValueFrom(
        this.natsClient.send('getLangByCode', {
          code: data.languageCode,
        }),
      );

      const user = await this.userRepository.save({
        ...data,
        language: code.id,
        nickname: data.tgUsername,
      });
      user.language = code.code;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneUserByTgId(tgUserId): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy(tgUserId);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneUserById(id): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.language', 'language')
        .leftJoin('user.club', 'club')
        .addSelect('club.id')
        .where('user.id =:id', id)
        .getOne();

      if (!user)
        throw new CustomRpcException(404, 'User with same id didn`t find');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAllUsersInClub(id): Promise<User[]> {
    try {
      console.log(id);

      const users = await this.userRepository
        .createQueryBuilder('user')
        .leftJoin('user.club', 'club')
        .where('club.id =:id', id)
        .select([
          'user.id',
          'user.bestHand',
          'user.totalGames',
          'user.avatar',
          'user.tgUsername',
          'user.roles',
          'user.nickname',
          'user.lvl',
          'user.rank',
        ])
        .getMany();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(data: UpdateUserInfoDto): Promise<User> {
    try {
      const { id } = data;
      if (data.language) {
        const code = await lastValueFrom(
          this.natsClient.send('getLangByCode', {
            code: data.language,
          }),
        );
        data.language = code.id;
      }
      console.log(data);
      delete data.languageCode;
      await this.userRepository.update(id, { ...data });

      return await this.findOneUserById({ id: id });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id): Promise<string> {
    try {
      await this.findOneUserById(id);
      await this.userRepository.delete(id);
      return 'Success';
    } catch (error) {
      throw error;
    }
  }
}
