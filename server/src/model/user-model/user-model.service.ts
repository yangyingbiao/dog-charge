import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from '../../entity/user'
import { BaseService } from '../base/base.service';





@Injectable()
export class UserModelService extends BaseService<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        protected model : Repository<UserEntity>
    ) {
        super()
    }
    
}
