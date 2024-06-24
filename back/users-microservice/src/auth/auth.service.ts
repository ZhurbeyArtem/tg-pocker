import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // constructor(
  //   private jwtService: JwtService,
  //   @InjectRepository(User) private userRepository: Repository<User>,
  // ) { }

  // async auth(data) {
  //   try {
  //     let result;
  //     const user = await this.userRepository.findOneBy({
  //       tgUserId: data.tgUserId,
  //     });

  //     if (user) result = await this.login(data);
  //     else {
  //       const observeable = await this.natsClient.send('getLangByCode', {
  //         code: data.languageCode,
  //       });
  //       const code = await lastValueFrom(observeable);
  //       result = await this.register(data, code.id);
  //     }

  //     return await this.generateToken(result);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // async generateToken(user: User) {
  //   try {
  //     const payload = {
  //       ...user,
  //     };
  //     const accessToken = this.jwtService.sign(payload, {
  //       expiresIn: '1d',
  //       secret: process.env.JWT_ACCESS_SECRET,
  //     });
  //     const refreshToken = this.jwtService.sign(payload, {
  //       expiresIn: '30d',
  //       secret: process.env.JWT_REFRESH_SECRET,
  //     });
  //     return {
  //       accessToken,
  //       refreshToken,
  //     };
  //   } catch (error) { }
  // }
  // async login(data) {
  //   try {
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async register(data, code) {
  //   try {
  //     return await this.userRepository.save({
  //       tgUserId: data.tgUserId,
  //       tgUsername: data.tgUsername,
  //       language: code,
  //       nickname: data.tgUsername,
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

}
