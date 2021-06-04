import { HttpModule, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  imports : [HttpModule.register({timeout : 10000})],
  providers: [PaymentService],
  exports : [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
