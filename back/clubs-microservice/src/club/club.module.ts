import { Module } from '@nestjs/common';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Club,
  ClubSettings,
  ClubInvitationLink,
  ClubBannedAndKickedUsers,
  ClubAttemptsLogin
} from '@lib/entities';
import { NatsClientModule } from '@lib/nats';

@Module({
  imports: [
    NatsClientModule,
    TypeOrmModule.forFeature([
      Club,
      ClubSettings,
      ClubInvitationLink,
      ClubBannedAndKickedUsers,
      ClubAttemptsLogin
    ]),
  ],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule { }
