import { Injectable } from '@nestjs/common';
import ChargePrice from 'src/entity/charge-price';
import { ChargePriceModelService } from 'src/model/charge-price-model/charge-price-model.service';
import { RedisService } from 'src/redis/redis.service';
import ChargePriceEntity from 'src/entity/charge-price';

@Injectable()
export class ChargePriceService {
    constructor(
        private model : ChargePriceModelService,
        private redis : RedisService
    ){}

    async select(priceId : number, field? : (keyof ChargePriceEntity)[]) : Promise<{[k in keyof ChargePriceEntity]? : ChargePriceEntity[k]} | null> {
        let price = await this.redis.get('price_' + priceId)
        if(!price) {
            price = await this.model.select({price_id : priceId}, field)
            if(!price) return null
        }else {
            if(price == process.env.cache_null) return null
            price = JSON.parse(price)
        }

        return price
    }
}
