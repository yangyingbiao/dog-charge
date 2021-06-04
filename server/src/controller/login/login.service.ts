import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/redis/redis.service';
import { getCurrentTime, random } from 'src/utils/utils.service';
import { UserModelService } from '../../model/user-model/user-model.service'
import { LoginJwtService } from './login-jwt/login-jwt.service';

@Injectable()
export class LoginService {
    constructor(
        private userServiceModel : UserModelService,
        private configService : ConfigService,
        private loginJwt : LoginJwtService,
        private redis : RedisService
    ){}

    createToken(secret, refreshSecret, user) : object {
        let expire = random(80000, 90000)
        let refresh_expire = expire - random(5000, 20000)

        return {
            access_token : this.loginJwt.sign(user, secret, expire),
            expire,
            refresh_token : this.loginJwt.sign({key : Math.floor(user.user_id / 13)}, refreshSecret, refresh_expire),
            refresh_expire
        }
    }

    async login(openid : string, session_key : string, unionid? : string) : Promise<object | null> {
        let currentTime = getCurrentTime()
        let user = await this.userServiceModel.select({openid : openid}, ['user_id', 'unionid', 'avatar', 'nickname', 'source'])
        if(!user) { //第一次
            let newUserData = {openid, session_key, register_time : currentTime, source : 1}
            if(unionid) {
                newUserData = Object.assign({unionid : unionid}, newUserData)
            }
            let userId = await this.userServiceModel.insert(newUserData)
            if(!userId) throw 'insert 用户失败'

            user = {user_id : userId, source : newUserData.source}

        }else {
            let updateUserData = {last_login_time : currentTime, session_key}
            if(unionid && !user.unionid) {
                updateUserData = Object.assign({unionid : unionid}, updateUserData)
            }
            
            let changeRows = await this.userServiceModel.update({user_id : user.user_id}, updateUserData)
            if(changeRows == 0) throw '更新用户信息失败'

            delete user.unionid
        }

        let jwtConfig:object = this.configService.get<object>('jwt')

        this.redis.set('user-' + String(user.user_id), user)
        
        return {...this.createToken(jwtConfig['secret'], jwtConfig['refresh_secret'], user), user}
    }

    async refresh(userId : number, token : string) {
        let jwtConfig:object = this.configService.get<object>('jwt')
        let res = this.loginJwt.verify(token, jwtConfig['refresh_secret'])
        if(!res || (res['key'] != Math.floor(userId / 13))) return null

        let user = await this.userServiceModel.select({user_id : userId}, ['avatar', 'nickname', 'source'])
        if(!user) return null

        user.user_id = userId

        return this.createToken(jwtConfig['secret'], jwtConfig['refresh_secret'], user)
    }

    
}
