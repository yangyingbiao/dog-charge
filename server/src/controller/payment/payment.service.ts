import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
    private wxAppid : string;
    private wxMchid : string;
    constructor(
        private http : HttpService,
        private configService : ConfigService
    ) {

    }
    async wxPay(openid : string, out_trade_no : string, total : number, description : string, notify_url : string, attach : string = '') : Promise<string | null> {
        try {
            let wxConfig = this.configService.get<object>('wx')

            let params : {[key : string] : any} = {
                appid : wxConfig['appid'],
                mchid : wxConfig['mchid'],

                out_trade_no,
                description,
                notify_url : 'https://www.baidu.com',
                attach,
                payer : { openid },
                amount : {currency : 'CNY', total : total * 100}
            }
            if(this.wxAppid) {
                params.appid = this.wxAppid
            }

            if(this.wxMchid) {
                params.wxMchid = this.wxMchid
            }
            
            let result = await this.http.post('https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi', params, {headers : {'Content-type' : 'application/json', 'Accept' : 'application/json', 'Authorization' : '43dw35ed345d', 'User-Agent' : 'dog-charge'}}).toPromise()
            if(result && result.status == 200 && result.data) {
                let data = result.data
                if(data.hasOwnProperty('prepay_id')) {
                    return data['prepay_id']
                }

                return null

            }else {
                return null
            }
        } catch (error) {
            
        }

        return null
    }
}
