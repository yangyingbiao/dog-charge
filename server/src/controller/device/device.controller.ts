import { Controller, Get, Query } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
    constructor(
        private deviceService : DeviceService
    ){}

    @Get()
    async index(@Query('deviceId') deviceId) {
        if(!deviceId) return UtilsService.errorResponse('请输入设备号')
        deviceId = Number(deviceId)
        if(isNaN(deviceId) && deviceId <= 0) return UtilsService.errorResponse('设备号非法')

        try {
            let data = await this.deviceService.getDeviceInfo(deviceId)
            return UtilsService.successResponse(data)
        } catch (error) {
            return UtilsService.errorResponse(error.message)
        }

    }
}
