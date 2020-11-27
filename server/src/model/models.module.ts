import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseService } from './base/base.service';
import { UserService } from './user/user.service';
import { MerchantService } from './merchant/merchant.service';
import { DeviceService } from './device/device.service';
import { StationService } from './station/station.service';
import { ChargePriceService } from './charge-price/charge-price.service';
import UserEntity from '../entity/user';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers : [BaseService, UserService, MerchantService, DeviceService, StationService, ChargePriceService],
  exports : [UserService]
})
export class ModelsModule {}
