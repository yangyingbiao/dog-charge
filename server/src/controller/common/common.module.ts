import { Global, Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Global()
@Module({
  controllers: [CommonController],
  providers: [CommonService]
})
export class CommonModule {}
