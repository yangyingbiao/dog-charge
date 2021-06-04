import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import AuthGuard from 'src/guard/auth';
import { RedisService } from 'src/redis/redis.service';
import { UtilsService } from 'src/utils/utils.service';
import { ChargeService } from './charge.service';

@Controller('charge')
//@UseGuards(AuthGuard)
export class ChargeController {
    constructor(
        private redis : RedisService,
        private chargeService : ChargeService
    ) {}
    @Post()
    async index(@Body() params : {deviceId : number | string, quantity : number | string, amount : number | string, priceId : number | string, key : string}) {
        this.chargeService.charge(1, 1,1,1,1,1)
        return '3333'
        try {
            let deviceId = Number(params.deviceId)
            if(isNaN(deviceId) || deviceId <= 0) return UtilsService.errorResponse()

            let quantity = Number(params.quantity)
            if(isNaN(quantity) || quantity <= 0) return UtilsService.errorResponse()

            let amount = Number(params.amount)
            if(isNaN(amount) || quantity < 0) return UtilsService.errorResponse()

            let priceId = Number(params.priceId)
            if(isNaN(priceId) || priceId <= 0) return UtilsService.errorResponse()

            if(!params.key) return UtilsService.errorResponse()
            let key = params.key.trim()
            if(!key) return UtilsService.errorResponse()

            //查询key,
            let res = await this.redis.get(key)
            if(!res || Number(res) != deviceId) return UtilsService.errorResponse()

            
        } catch (error) {
            
        }
    }
}
