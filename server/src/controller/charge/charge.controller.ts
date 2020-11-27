import { Body, Controller, Post } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { UtilsService } from 'src/utils/utils.service';

@Controller('charge')
export class ChargeController {
    constructor(
        private redis : RedisService
    ) {}
    @Post()
    async index(@Body() params : {deviceId : number | string, quantity : number | string, amount : number | string, priceId : number | string, key : string}) {
        let key = params.key
        if(!key) return UtilsService.errorResponse()

        //查询key
        let checked = await this.redis.get(key)
        if(!checked) return UtilsService.errorResponse()

        let device = this.redis.get('dev_' + params.deviceId)
        if(!device) {
            
        }
    }
}
