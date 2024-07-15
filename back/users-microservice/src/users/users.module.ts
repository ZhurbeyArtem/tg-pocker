import { Module } from '@nestjs/common';
import { UserMicroserviceController } from './users.controller';

import { NatsClientModule } from '@lib/nats';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@lib/entities';

@Module({
  imports: [NatsClientModule, TypeOrmModule.forFeature([User])],
  controllers: [UserMicroserviceController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule { }
