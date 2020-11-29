import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import AuthGuard from 'src/guard/auth';
import { RedisService } from 'src/redis/redis.service';
import { getCurrentTime, md5, UtilsService } from 'src/utils/utils.service';
import { DeviceService } from './device.service';

@Controller('device')
//@UseGuards(AuthGuard)
export class DeviceController {
    constructor(
        private deviceService : DeviceService,
        private redis : RedisService
    ){}

    @Get()
    async index(@Query('deviceId') deviceId, @Request() req) {
        if(!deviceId) return UtilsService.errorResponse('请输入设备号')
        deviceId = Number(deviceId)
        if(isNaN(deviceId) && deviceId <= 0) return UtilsService.errorResponse('设备号非法')

        try {
            let data:{[key : string] : any} | null = await this.deviceService.getDeviceInfo(deviceId)
            if(!data) {
                return UtilsService.errorResponse('查询设备信息失败')
            }

            let userId = req.$user.user_id
            let key = md5(userId + deviceId + getCurrentTime())
            this.redis.set(key, deviceId, 1800)

            data.key = key

            return UtilsService.successResponse(data)

        } catch (error) {
            return UtilsService.errorResponse(error.message)
        }

    }
}
