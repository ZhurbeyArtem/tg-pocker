import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => console.log(`Started on port: ${PORT}`));
}
bootstrap();
