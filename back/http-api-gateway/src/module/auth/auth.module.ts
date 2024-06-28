import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { GuardsModule } from '@lib/guards';
import { JwtConfigModule } from '@lib/jwt';

@Module({
  imports: [NatsClientModule, GuardsModule, JwtConfigModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule { }
