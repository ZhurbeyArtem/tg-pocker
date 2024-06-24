import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from '@lib/entities';

@Module({
  imports: [NatsClientModule, TypeOrmModule.forFeature([Language])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule { }
