import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { UpdateUserInfoDto } from './dtos/UpdateUserInfo.dto';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFilesService } from '@lib/upload-files';
import { Access, RolesGuard, AuthGuard } from '@lib/guards';
import { AllExceptionsFilter } from '@lib/exception';
@UseFilters(AllExceptionsFilter)
@Controller('users')
export class UsersController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private fileService: UploadFilesService,
  ) { }

  @Post('/create')
  create(@Body() authUserDto: CreateUserDto) {
    return this.natsClient.send('createUser', authUserDto);
  }

  @Put('/update')
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @Body() updateUserInfoDto: UpdateUserInfoDto,
    @UploadedFile() file,
  ) {
    try {
      this.natsClient.send('getUserInfoById', updateUserInfoDto.id);

      if (file) {
        const fileUrl = await this.fileService.uploadFile(
          `user-${updateUserInfoDto.id}.${file.originalname.split('.')[1]}`,
          file.buffer,
          file.mimetype,
        );
        updateUserInfoDto.avatar = fileUrl;
      }

      return this.natsClient.send('updateUser', updateUserInfoDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('/info/:id')
  getInfo(@Param() id: string) {
    return this.natsClient.send('getUserInfoById', id);
  }

  @Access({ roles: ['admin'], lvl: 2, rank: 1 })
  @UseGuards(RolesGuard, AuthGuard)
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
