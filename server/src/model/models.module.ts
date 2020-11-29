import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseService } from './base/base.service';
import { UserModelService } from './user-model/user-model.service';
import { MerchantModelService } from './merchant-model/merchant-model.service';
import { DeviceModelService  } from './device-model/device-model.service';
import { StationModelService } from './station-model/station-model.service';
import { ChargePriceModelService } from './charge-price-model/charge-price-model.service';
import { ChargeOrderModelService } from './charge-order-model/charge-order-model.service';
import UserEntity from '../entity/user';
import MerchantEntity from '../entity/merchant';
import StationEntity from '../entity/station';
import ChargePriceEntity from '../entity/charge-price';
import DeviceEntity from '../entity/device';
import ChargeOderEntity from '../entity/charge-order';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity,
    MerchantEntity,
    StationEntity,
    ChargePriceEntity,
    DeviceEntity,
    ChargeOderEntity
  ])],
  providers : [BaseService, UserModelService, MerchantModelService, DeviceModelService, StationModelService, ChargePriceModelService, ChargeOrderModelService],
  exports : [UserModelService, MerchantModelService, DeviceModelService, StationModelService, ChargePriceModelService, ChargeOrderModelService]
})
export class ModelsModule {}
