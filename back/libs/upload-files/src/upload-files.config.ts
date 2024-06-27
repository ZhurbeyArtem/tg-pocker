import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env') });
const configService = new ConfigService();

export default () => ({
  aws: {
    accessKeyId: configService.get('AWS_S3_KEY'),
    secretAccessKey: configService.get('AWS_S3_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_S3_REGION'),
    s3: {
      bucketName: configService.get('AWS_S3_NAME'),
    },
  },
});
