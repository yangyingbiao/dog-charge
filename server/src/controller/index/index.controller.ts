import { Controller, Get, Query } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { UtilsService } from 'src/utils/utils.service';

@Controller('index')
export class IndexController {
    constructor(
        private redis : RedisService
    ){}
    @Get('nearDeivce')
    async nearDevice(@Query() query : {longitude : string | number, latitude : string | number}) {
        if(!query.longitude || !query.latitude) return UtilsService.errorResponse()

        let longitude = Number(query.longitude)
        let latitude = Number(query.latitude)
        if(isNaN(longitude) || isNaN(latitude)) return UtilsService.errorResponse()

        this.redis.georadius('near_device', 113.964411, 22.652231, 5000, 1, 'm')

        return 'werwerwer'
        
        // if(!query.longitude : ) {}
        // let longitude = Number(query.longitude || 0)
        // let latitude = Number(query.latitude || 0)
    }
}
