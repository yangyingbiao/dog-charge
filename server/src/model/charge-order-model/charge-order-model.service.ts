import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChargeOrderEntity from '../../entity/charge-order'
import { BaseService } from '../base/base.service';

@Injectable()
export class ChargeOrderModelService extends BaseService<ChargeOrderEntity> {
    constructor(
        @InjectRepository(ChargeOrderEntity)
        protected model : Repository<ChargeOrderEntity>
    ){
        super()
    }
}
