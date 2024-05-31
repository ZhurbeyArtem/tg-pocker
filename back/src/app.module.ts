import { Module } from '@nestjs/common';
import { TelegramModule } from './module/telegram/telegram.module';


@Module({
  imports: [TelegramModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
