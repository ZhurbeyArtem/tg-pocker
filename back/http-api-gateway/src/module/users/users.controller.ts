import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { UpdateUserInfoDto } from './dtos/UpdateUserInfo.dto';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

  @Post('/create')
  create(@Body() authUserDto: CreateUserDto) {
    return this.natsClient.send('createUser', authUserDto);
  }

  @Put('/update')
  update(@Body() updateUserInfoDto: UpdateUserInfoDto) {
    return this.natsClient.send('updateUser', updateUserInfoDto);
  }

  @Get('/info/:id')
  getInfo(@Param() id: string) {
    return this.natsClient.send('getUserInfoById', id);
  }

  @Delete('/:id')
  delete(@Param() id: string) {
    return this.natsClient.send('deleteUser', id);
  }

  // @Get()
  // info() { }

  // @Post()
  // auth() { }
  // @Post()
  // auth() { }
  // @Post()
  // auth() { }
  // @Post()
  // auth() { }
  // @Put()
  // auth() { }

  // @Put()
  // auth() { }
  // @Get()
  // info() { }

  // @Delete()
  // info() { }
}
