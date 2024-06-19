import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { config } from 'dotenv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

config({ path: join(process.cwd(), '.env') });
const configService = new ConfigService();

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: configService.get<string>('REDIS_URL'),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class CustomRedisModule { }
