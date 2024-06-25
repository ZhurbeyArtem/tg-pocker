import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthDto } from './dtos/Auth.dto';
import { RefreshDto } from './dtos/Refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

  @Post('/')
  create(@Body() authDto: AuthDto) {
    return this.natsClient.send('auth', authDto);
  }

  @Post('/refresh')
  refresh(@Body() authDto: RefreshDto) {
    return this.natsClient.send('refresh', authDto);
  }
}
