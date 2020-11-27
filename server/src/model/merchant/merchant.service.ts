import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MerchantEntity from 'src/entity/merchant';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';

@Injectable()
export class MerchantService extends BaseService<MerchantEntity> {
    constructor(
        @InjectRepository(MerchantEntity)
        protected model : Repository<MerchantEntity>
    ){
        super();
    }
}
