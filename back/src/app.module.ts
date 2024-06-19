import { Module } from '@nestjs/common';
import { TelegramModule } from './module/telegram/telegram.module';
import { GameModule } from './module/game/game.module';
import { ProvidersModule } from '@lib/providers';


@Module({
  imports: [TelegramModule, GameModule, ProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
