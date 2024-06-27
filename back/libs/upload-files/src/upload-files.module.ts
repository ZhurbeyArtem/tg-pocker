import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadFilesService } from './upload-files.service';
import awsConfig from './upload-files.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [awsConfig],
    }),
    
  ],
  providers: [UploadFilesService],
  exports: [UploadFilesService],
})
export class UploadFilesModule { }
