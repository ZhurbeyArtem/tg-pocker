import { Module } from '@nestjs/common';
import { ProvidersModule } from '@lib/providers';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [ProvidersModule, LanguagesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
