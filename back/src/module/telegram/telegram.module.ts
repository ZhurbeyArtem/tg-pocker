import { Module } from '@nestjs/common';
import { TelegramUpdate } from './telegram.update';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TG_TOKEN,
    }),
  ],
  providers: [TelegramService, TelegramUpdate],
})
export class TelegramModule {}
