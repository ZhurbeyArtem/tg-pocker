import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersModule } from '@lib/providers';


@Module({
  imports: [ProvidersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
