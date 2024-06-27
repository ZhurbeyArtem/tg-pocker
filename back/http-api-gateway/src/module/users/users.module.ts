import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { UploadFilesModule } from '@lib/upload-files';
@Module({
  imports: [NatsClientModule, UploadFilesModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule { }
