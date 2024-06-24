import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [LanguagesController],
  providers: [],
})
export class LanguagesModule {}
