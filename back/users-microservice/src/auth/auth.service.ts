import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { User, RefreshToken } from '@lib/entities';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomRpcException } from '@lib/exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
    @InjectRepository(RefreshToken)
    private refreshTokenRep: Repository<RefreshToken>,
  ) { }

  async auth(data) {
    try {
      let user = await this.usersService.findOneUserByTgId({
        tgUserId: data.tgUserId,
      });

      if (!user) user = await this.register(data);

      const { accessToken } = await this.generateToken(user);
      user = await this.usersService.updateUser({ ...user, accessToken });

      return user;
    } catch (error) {
      throw error;
    }
  }
  async generateToken(user: User) {
    try {
      const payload = {
        role: user.roles,
        status: user.status,
        userId: user.id,
        lvl: user.lvl,
        rank: user.rank
      };
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = uuidv4();
      await this.storeRefreshToken(accessToken, user.id);
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async storeRefreshToken(token: string, userId) {
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3); // that expired after 3 days
      await this.refreshTokenRep.save({
        token,
        user: userId,
        expiresAt: expiryDate,
      });
    } catch (error) {
      throw error;
    }
  }

  async register(data) {
    try {
      return await this.usersService.createUser(data);
    } catch (error) {
      throw error;
    }
  }

  async refreshTokens(refreshToken) {
    try {
      const currentDate = new Date();
      const token = await this.refreshTokenRep
        .createQueryBuilder('refreshToken')
        .where('refreshToken.expiresAt >= :currentDate', { currentDate })
        .andWhere('refreshToken.token = :token', { token: refreshToken })
        .leftJoinAndSelect('refreshToken.user', 'user')
        .getOne();
      await this.refreshTokenRep.delete({ token: refreshToken });

      if (!token) throw new CustomRpcException(401, 'Refresh token is invalid');
      return this.generateToken(token.user);
    } catch (error) {
      throw error;
    }
  }
}
