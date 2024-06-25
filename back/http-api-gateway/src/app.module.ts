import { Module } from '@nestjs/common';
import { TelegramModule } from './module/telegram/telegram.module';
import { GameModule } from './module/game/game.module';
import { UsersModule } from './module/users/users.module';
import { LanguagesModule } from './module/languages/languages.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    // TelegramModule,
    // GameModule,
    UsersModule,
    LanguagesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
