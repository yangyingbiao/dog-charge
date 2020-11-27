import { Body, Controller, HttpService, Post, Request, UseGuards } from '@nestjs/common';
import { request } from 'express';
import AuthGuard from 'src/guard/auth';
import { UtilsService } from '../../utils/utils.service';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private loginService : LoginService) {}

    @Post()
    async login(@Body() params) {
        let code:string = params.code
        if(!code) {
            return UtilsService.errorResponse()
        }
        
        let http = new HttpService()
        let result = {
            status : 200,
            
            data : {
                errcode : 0,
                session_key: 'KIZgpL6E3MkVatJDfYCaPQ==',
            openid: 'o-64P5fHXRh-Go3Q3Wn1RIbj0_Rw',
            unionid: 'ogK-Awzoci-l-rw5S8UT3Isvb72Q'
            }
        }//await http.get('https://api.weixin.qq.com/sns/jscode2session', {params : {js_code : code, appid : 'wxa3a63a716befc49e', secret : '653f7655fe8acbe2c83755d47e34b81d', grant_type : 'authorization_code'}}).toPromise()
        if(result && result.status == 200 && result.data) {
            let data = result.data
            if(data.hasOwnProperty('errcode') && data.errcode != 0) {
                return UtilsService.errorResponse('登录失败')
            }

            let res = await this.loginService.login(data.openid, data.session_key, data.unionid)

            

            return res

        }else {
            return UtilsService.errorResponse('登录失败')
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
