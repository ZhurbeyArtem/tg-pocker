import { Module } from '@nestjs/common';
import { TypeormModule } from './typeorm/typeorm.module';
import { CustomRedisModule } from './redis/redis.module';

@Module({
  providers: [],
  exports: [],
  imports: [TypeormModule, CustomRedisModule],
})
export class ProvidersModule { }
