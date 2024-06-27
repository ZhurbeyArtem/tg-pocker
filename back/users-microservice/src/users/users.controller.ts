import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserInfoDto } from './dtos/UpdateUserInfo';

import { AllExceptionsFilter } from '@lib/exception';
import { UserService } from './users.service';

@Controller()
@UseFilters(AllExceptionsFilter)
export class UserMicroserviceController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern('createUser')
  async create(@Payload() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @MessagePattern('updateUser')
  async update(@Payload() data: UpdateUserInfoDto) {
    console.log(data);
    return await this.userService.updateUser(data);
  }

  @MessagePattern('getUserInfoById')
  async findOneById(@Payload() id: string) {
    return await this.userService.findOneUserById(id);
  }

  @MessagePattern('deleteUser')
  async delete(@Payload() id: string) {
    return await this.userService.deleteUser(id);
  }
}
