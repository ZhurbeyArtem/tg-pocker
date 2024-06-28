import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs'
import { ACCESS_KEY } from './role.decorator'
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService,

    private reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredPermission = this.reflector.getAllAndOverride(ACCESS_KEY, [context.getHandler(), context.getClass()])
      if (!requiredPermission) {
        return true
      }

      const request = context.switchToHttp().getRequest()
      const authHeader = request.headers.authorization
      const bearer = authHeader?.split(' ')[0];
      const token = authHeader?.split(' ')[1];

      if (!token || bearer !== "Bearer") {
        throw new UnauthorizedException("Invalid token");
      }

      let user;
      try {
        user = this.jwtService.verify(token);
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
      
     
      request.user = user
      if (!user.role.some(role => requiredPermission.role.includes(role)) || !user.rank >= requiredPermission.rank || !user.lvl >= requiredPermission.lvl) {
        console.log('here');

        throw new HttpException('User doesn`t have permission', HttpStatus.FORBIDDEN)
      }

      return true

    } catch (error) {
      throw error
    }
  }


}
