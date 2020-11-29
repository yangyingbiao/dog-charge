import { Module } from '@nestjs/common';
import { StationService } from './station.service';

@Module({
  providers: [StationService],
  imports : [StationService]
})
export class StationModule {}
