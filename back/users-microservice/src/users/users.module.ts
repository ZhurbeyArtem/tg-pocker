import { Module } from '@nestjs/common';
import { UserMicroserviceController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@lib/entities';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.PRiVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    NatsClientModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserMicroserviceController],
  providers: [UserService],
})
export class UsersModule { }
