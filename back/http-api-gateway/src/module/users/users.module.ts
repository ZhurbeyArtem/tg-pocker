import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UploadFilesModule } from '@lib/upload-files';
import { GuardsModule } from '@lib/guards';
import { JwtConfigModule } from '@lib/jwt';
import { NatsClientModule } from '@lib/nats';

@Module({
  imports: [NatsClientModule, UploadFilesModule, GuardsModule, JwtConfigModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule { }
