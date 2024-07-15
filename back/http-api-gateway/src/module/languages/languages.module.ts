import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { NatsClientModule } from '@lib/nats';

@Module({
  imports: [NatsClientModule],
  controllers: [LanguagesController],
  providers: [],
})
export class LanguagesModule {}
