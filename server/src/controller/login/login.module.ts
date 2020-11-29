import { Global, HttpModule, Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginJwtService } from './login-jwt/login-jwt.service';

@Global()
@Module({
  imports : [HttpModule.register({timeout : 10000}), JwtModule.register({})],
  controllers: [LoginController],
  providers: [LoginService, LoginJwtService],
  exports : [LoginJwtService]
})
export class LoginModule {
  
}
