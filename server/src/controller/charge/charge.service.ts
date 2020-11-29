import { Injectable } from '@nestjs/common';
import ChargePrice from 'src/entity/charge-price';
import { ChargePriceModelService } from 'src/model/charge-price-model/charge-price-model.service';
import { DeviceModelService } from 'src/model/device-model/device-model.service';
import { RedisService } from 'src/redis/redis.service';
import { ChargePriceService } from '../charge-price/charge-price.service';
import { MerchantService } from '../merchant/merchant.service';
import ChargeOrderEntity from 'src/entity/charge-order'
import { UserModelService } from 'src/model/user-model/user-model.service';
import { getCurrentTime } from 'src/utils/utils.service';
import { PaymentService } from '../payment/payment.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ChargeService {
    constructor(
        private redis : RedisService,
        private deviceModel : DeviceModelService,
        private chargePriceService : ChargePriceService,
        private merchantService : MerchantService,
        private userModel : UserModelService,
        private userService : UserService,
        private payment : PaymentService
    ) {}

    async charge(userId : number, payChannel : number, deviceId : number, quantity : number, amount : number, priceId : number) {
        let device = await this.redis.get('dev_' + deviceId)
        if(!device) {
            device = await this.deviceModel.select({device_id : deviceId}, ['merchant_id', 'station_id', 'price_id'])
            if(!device) throw '设备不存在'
        }else {
            if(device === process.env.cache_null) throw '设备不存在'
            device = JSON.parse(device)
        }

        //查询价格
        let price = await this.chargePriceService.select(priceId, ['unit_price'])
        if(!price) throw '价格套餐不存在'

        //校验价格
        let _amount = Number((quantity * price.unit_price).toFixed(2))
        if(_amount != amount) throw '价格校验失败'

        let time = getCurrentTime()

        let order : {[k in keyof ChargeOrderEntity]? : ChargeOrderEntity[k]} = {
            user_id : userId,
            order_no : '',
            device_id : deviceId,
            merchat_id : device.merchat_id,
            station_id : device.station_id,
            unit_price : price.unit_price,
            min_settle_quantity : price.min_settle_quantity,
            charge_quantity : quantity,
            amount : amount,
            create_time : time
        }

        if(amount == 0) { //直接充电

        }


        if(payChannel == 2) { //余额支付
            let wallet = await this.userModel.select({user_id : userId}, ['amount', 'reward_amount'])
            if(wallet['amount'] + wallet['reward_amount'] < amount) throw '余额不足'
        }else {
            let user = await this.userService.select(userId, ['openid'])
            let prepayId = await this.payment.wxPay(user['openid'], order['order_no'], amount, '充电', '', )
        }

        

        if(device.merchantId && device.merchantId > 0) {
            let merchant = await this.merchantService.select(device.merchantId)
            if(!merchant) throw '商家不存在'
        }
        
    }
}
