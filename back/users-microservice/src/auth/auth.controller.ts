import { Controller, UseFilters } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
// import { AuthUserDto } from './dtos/AuthUser.dto';
// import { UpdateUserInfoDto } from './dtos/UpdateUserInfo';
import { AllExceptionsFilter } from '@lib/exception';
// import { UserService } from './users.service';

@Controller('auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  // constructor(private readonly userService: UserService) { }

  // @MessagePattern('authUser')
  // async authUser(@Payload() data: AuthUserDto) {
  //   await this.userService.auth(data);
  //   return data;
  // }

}
