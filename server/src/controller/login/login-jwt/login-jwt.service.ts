import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { random, ksort, getCurrentTime, md5 } from 'src/utils/utils.service';

@Injectable()
export class LoginJwtService {
    constructor(
        private nestJwtService : JwtService
    ){}

    sign(payload : any, secret : string, expiresIn : number = 3600) : string {
        payload = {...payload}
        payload.$nonce = LoginJwtService.createNonceStr(32)
        payload.$time = getCurrentTime()
        payload = ksort(payload)
        
        let payloadStr = LoginJwtService.createPayloadStr(payload)

        payload.sign = (LoginJwtService.createNonceStr(19) + md5(payloadStr)).toLowerCase()

        let token = this.nestJwtService.sign({data : payload, key : random(1022, 135684)}, {secret : secret, expiresIn : expiresIn})
        return token
    }

    verify(token : string, secret : string) : object | null {
        try {
            let payload = this.nestJwtService.verify(token, { secret })
            payload = payload.data

            //取出sign
            let sign = payload.sign.substr(19)
            delete payload.sign

            payload = ksort(payload)
            let payloadStr = LoginJwtService.createPayloadStr(payload)

            if(sign == md5(payloadStr).toLowerCase()) {
                delete payload.$nonce
                delete payload.$time
                return payload
            }

            return null


        } catch (error) {
            console.log(error.message)
        }

        return null
        
    }

    private static createPayloadStr(payload : any) : string {
        let tmpArr = []
        for(let k in payload) {
            tmpArr.push(k +'=' + payload[k])
        }
        
        let payloadStr:string = tmpArr.join('&')
        payloadStr += ('&t=' + md5(String(payload.$time) + payload.$nonce))

        return payloadStr
    }

    private static createNonceStr(len : number = 32) {
        let chars = 'q1az2x3swed40cv5fr6tgbn7hy8ujmk9iolp'
        let max = chars.length - 1
        let str = ''
        for(let i = 0; i < len; i ++) {
            str += chars.charAt(random(0, max))
        }

        return str
    }
}
