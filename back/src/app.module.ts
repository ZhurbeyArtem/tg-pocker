import { Module } from '@nestjs/common';
import { TelegramModule } from './module/telegram/telegram.module';
import { GameModule } from './module/game/game.module';


@Module({
  imports: [TelegramModule, GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
