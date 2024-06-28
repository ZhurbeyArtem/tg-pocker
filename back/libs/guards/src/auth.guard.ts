import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const authHeader = request.headers.authorization
      const bearer = authHeader?.split(' ')[0];
      const token = authHeader?.split(' ')[1];

      if (!token || bearer !== "Bearer") {
        throw new UnauthorizedException("Invalid token");
      }
  
      const user = this.jwtService.verify(token)

      request.user = user
      return true

    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }


}
