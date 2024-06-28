import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { UploadFilesModule } from '@lib/upload-files';
import { GuardsModule } from '@lib/guards';
import { JwtConfigModule } from '@lib/jwt';
@Module({
  imports: [NatsClientModule, UploadFilesModule, GuardsModule, JwtConfigModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule { }
