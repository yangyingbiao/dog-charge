import { Injectable } from '@nestjs/common';
import { UserModelService } from 'src/model/user-model/user-model.service';
import { RedisService } from 'src/redis/redis.service';
import UserEntity from 'src/entity/user'

@Injectable()
export class UserService {
    constructor(
        private model : UserModelService,
        private redis : RedisService
    ){}
    async select(userId : number, field? : (keyof UserEntity)[]) : Promise<{[k in keyof UserEntity]? : UserEntity[k]} | null> {
        let user = await this.redis.get('user_' + userId)
        if(!user) {
            user = await this.model.select({user_id : userId}, field)
            if(!user) return null
        }else {
            if(user == process.env.cache_null) return null
            user = JSON.parse(user)
        }

        return user
    }
}
