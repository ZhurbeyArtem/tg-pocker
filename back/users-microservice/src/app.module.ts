import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProvidersModule } from '@lib/providers';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ProvidersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
