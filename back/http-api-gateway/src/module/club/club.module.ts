import { Module } from '@nestjs/common';
import { ClubController } from './club.controller';
import { NatsClientModule } from '@lib/nats';
import { UploadFilesModule } from '@lib/upload-files';
import { GuardsModule } from '@lib/guards';
import { JwtConfigModule } from '@lib/jwt';

@Module({
  imports: [NatsClientModule, UploadFilesModule, GuardsModule, JwtConfigModule],
  controllers: [ClubController],
})
export class ClubModule { }
