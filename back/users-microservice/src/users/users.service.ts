import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) { }

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      const observable = this.natsClient.send('getLangByCode', {
        code: data.languageCode,
      });
      const code = await lastValueFrom(observable);
      return await this.userRepository.save({
        ...data,
        language: code.id,
        nickname: data.tgUsername,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneUserByTgId(id): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({
        tgUserId: id,
      });

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
        .where('user.id =:id', id)
        .getOne();

      if (!user)
        throw new CustomRpcException(404, 'User with same id didn`t find');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(data: UpdateUserInfoDto): Promise<User> {
    try {
      const { id } = data;

      await this.findOneUserById({ id: id });
      if (data.language) {
        const observable = this.natsClient.send('getLangByCode', {
          code: data.language,
        });
        const code = await lastValueFrom(observable);
        data.language = code.id;
      }
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
