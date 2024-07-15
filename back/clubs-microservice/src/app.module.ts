import { Module } from '@nestjs/common';
import { ProvidersModule } from '@lib/providers';
import { ClubModule } from './club/club.module';

@Module({
  imports: [ProvidersModule, ClubModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
