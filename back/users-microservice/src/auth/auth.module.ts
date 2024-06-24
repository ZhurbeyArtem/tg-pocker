import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [NatsClientModule,
    // UserService
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
