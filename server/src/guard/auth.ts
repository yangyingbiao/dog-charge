import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from 'src/utils/utils.service';
import { LoginJwtService } from '../controller/login/login-jwt/login-jwt.service'

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    private loginJwtService : LoginJwtService,
    private configService : ConfigService
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    let request = context.switchToHttp().getRequest()
    const headers = request.headers
    let authorization = headers.authorization
    if(authorization) {
      let jwtConfig:object = this.configService.get<object>('jwt')
      let res = this.loginJwtService.verify(authorization, jwtConfig['secret'])
      if(res != null) {
        request.$user = res
        return true
      }
    }

    throw new UnauthorizedException(UtilsService.errorResponse('未登录', 301))
  }
}