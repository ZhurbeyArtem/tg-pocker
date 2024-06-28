import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { JwtConfigModule } from '../../jwt/src';
import { RolesGuard } from './role.guard';


@Module({
  imports: [
    JwtConfigModule
  ],
  providers: [AuthGuard, RolesGuard],
  exports: [AuthGuard, RolesGuard],
})
export class GuardsModule { }
