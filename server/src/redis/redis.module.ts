import { Module, CacheModule, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import * as redisStore from 'cache-manager-redis';

@Global()
@Module({
    imports: [CacheModule.register({
        store : redisStore,
        host: 'localhost',
        ttl : 0,
        port: 6379,
        min : 6,
        max : 10
    })],
    providers: [RedisService],
    exports : [RedisService]
})
export class RedisModule {
    
}
