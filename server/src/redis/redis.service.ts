import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ConnectionBase } from 'mongoose';

@Injectable()
export class RedisService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
    ){}

    async get(key) {
        return this.cache.get(key);
    }

    async set(key : string, value : any, ttl : number = 0) {
        if(typeof value != 'string') {
            value = JSON.stringify(value)
        }
        this.cache.set(key, value, { ttl });
    }

    async georadius(key : string, longitude : number, latitude : number, distance : number, count : number, units : 'm' | 'km' | 'mi' | 'ft' = 'm', options : {[key : string] : any} = {}) {
        let client = await this.cache.store.getClient()
        var geo = require('georedis').initialize(client.client, {zset : key})
        
        return new Promise((resolve, reject) => {
            geo.nearby({ latitude, longitude}, distance, {count, units, ...options}, (e, r) => {
                resolve(e ? [] : r)
            })
        })

    }
}
