import { Module } from '@nestjs/common';
import { ChargePriceService } from './charge-price.service';

@Module({
  providers: [ChargePriceService],
  exports : [ChargePriceService]
})
export class ChargePriceModule {}
