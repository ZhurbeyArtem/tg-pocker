import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NatsClientModule } from '@lib/nats';
import { RefreshToken } from '@lib/entities';
import { JwtConfigModule } from '@lib/jwt';

import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    NatsClientModule,
    UsersModule,
    JwtConfigModule,
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
