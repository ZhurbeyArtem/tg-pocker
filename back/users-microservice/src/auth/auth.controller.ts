import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AllExceptionsFilter } from '@lib/exception';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/Auth.dto';

@Controller()
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern('auth')
  async authUser(@Payload() data: AuthDto) {
    return await this.authService.auth(data);
  }

  @MessagePattern('refresh')
  async refreshToken(@Payload() token: string) {
    return await this.authService.refreshTokens(token);
  }
}
