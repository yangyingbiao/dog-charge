
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChargePriceEntity from '../../entity/charge-price'
import { BaseService } from '../base/base.service';





@Injectable()
export class ChargePriceService extends BaseService<ChargePriceEntity> {
    constructor(
        @InjectRepository(ChargePriceEntity)
        protected model : Repository<ChargePriceEntity>
    ) {
        super()
    }
    
}
