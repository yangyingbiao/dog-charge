import { Test, TestingModule } from '@nestjs/testing';
import { ChargePriceService } from './charge-price.service';

describe('ChargePriceService', () => {
  let service: ChargePriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargePriceService],
    }).compile();

    service = module.get<ChargePriceService>(ChargePriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
