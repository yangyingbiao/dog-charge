import { Injectable } from '@nestjs/common';
import { StationModelService } from 'src/model/station-model/station-model.service';
import { RedisService } from 'src/redis/redis.service';
import StationEntity from 'src/entity/station';

@Injectable()
export class StationService {
    constructor(
        private model : StationModelService,
        private redis : RedisService
    ){}

    async select(stationId : number, field? : (keyof StationEntity)[]) : Promise<{[k in keyof StationEntity]? : StationEntity[k]} | null> {
        let station = await this.redis.get('station_' + stationId)
        if(!station) {
            station = await this.model.select({station_id : stationId}, field)
            if(!station) return null
        }else {
            if(station == process.env.cache_null) return null
            station = JSON.parse(station)
        }

        return station
    }
}
