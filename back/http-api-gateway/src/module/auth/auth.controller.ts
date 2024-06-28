import {
  Body,
  Controller,
  Headers,
  Inject,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthDto } from './dtos/Auth.dto';
import { RefreshDto } from './dtos/Refresh.dto';
import { AuthGuard } from '@lib/guards';
import { AllExceptionsFilter } from '@lib/exception';

@Controller('auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

  @Post('/')
  create(@Body() authDto: AuthDto) {
    return this.natsClient.send('auth', authDto);
  }

  @Post('/refresh')
  @UseGuards(AuthGuard)
  refresh(@Headers() header: RefreshDto) {
    const token = header.authorization.split(' ')[1];
    return this.natsClient.send('refresh', token);
  }
}
