import { Injectable } from '@nestjs/common';
import { MerchantModelService } from 'src/model/merchant-model/merchant-model.service';
import { RedisService } from 'src/redis/redis.service';
import MerchantEntity from 'src/entity/merchant';

@Injectable()
export class MerchantService {
    constructor(
        private model : MerchantModelService,
        private redis : RedisService
    ){}

    async select(merchantId : number, field? : (keyof MerchantEntity)[]) : Promise<{[k in keyof MerchantEntity]? : MerchantEntity[k]} | null> {
        let merchant = await this.redis.get('merchant_' + merchantId)
        if(!merchant) {
            merchant = await this.model.select({merchant_id : merchantId}, field)
            if(!merchant) return null
        }else {
            if(merchant == process.env.cache_null) return null
            merchant = JSON.parse(merchant)
        }

        return merchant
    }
}
