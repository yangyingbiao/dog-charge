import { Module } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { ChargeController } from './charge.controller';
import { MerchantModule } from '../merchant/merchant.module';
import { StationModule } from '../station/station.module';
import { ChargePriceModule } from '../charge-price/charge-price.module';
import { UserModule } from '../user/user.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports : [MerchantModule, StationModule, ChargePriceModule, UserModule, PaymentModule],
  providers: [ChargeService],
  controllers: [ChargeController]
})
export class ChargeModule {}
