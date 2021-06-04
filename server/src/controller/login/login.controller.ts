import { Body, Controller, HttpService, Post, Request, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AuthGuard from 'src/guard/auth';
import { UtilsService } from '../../utils/utils.service';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(
        private loginService : LoginService,
        private configService : ConfigService
    ) {}

    @Post()
    async login(@Body() params) {
        try {
            let code:string = params.code
            if(!code) {
                return UtilsService.errorResponse()
            }
            
            let wxConfig = this.configService.get<object>('wx')
            
            let http = new HttpService()
            let result = await http.get('https://api.weixin.qq.com/sns/jscode2session', {params : {js_code : code, appid : wxConfig['appid'], secret : wxConfig['secret'], grant_type : 'authorization_code'}}).toPromise()
            if(result && result.status == 200 && result.data) {
                let data = result.data
                if(data.hasOwnProperty('errcode') && data.errcode != 0) {
                    return UtilsService.errorResponse('登录失败')
                }

                let res = await this.loginService.login(data.openid, data.session_key, data.unionid)

                if(!res) return UtilsService.errorResponse('登录失败')
                
                return UtilsService.successResponse(res)

            }else {
                return UtilsService.errorResponse('登录失败')
            }
        } catch (error) {
            return UtilsService.errorResponse(error.message)
        }
    }

    @Post('refresh')
    @UseGuards(AuthGuard)
    async refresh(@Body() params, @Request() req) {
        let userId = req.$user.user_id
        let token = params.token
        if(!token) return UtilsService.errorResponse('请求失败')

        let res = await this.loginService.refresh(userId, token)
        if(res == null) {
            return UtilsService.errorResponse('刷新失败')
        }
        return UtilsService.successResponse(res)
    }

}
