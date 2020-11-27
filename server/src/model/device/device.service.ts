import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DevicetEntity from 'src/entity/device';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';

@Injectable()
export class DeviceService extends BaseService<DevicetEntity> {
    constructor(
        @InjectRepository(DevicetEntity)
        protected model : Repository<DevicetEntity>
    ){
        super();
    }
}
