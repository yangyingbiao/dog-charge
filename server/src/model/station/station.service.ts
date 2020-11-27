import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import StationEntity from 'src/entity/station';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';

@Injectable()
export class StationService extends BaseService<StationEntity> {
    constructor(
        @InjectRepository(StationEntity)
        protected model : Repository<StationEntity>
    ){
        super();
    }
}
