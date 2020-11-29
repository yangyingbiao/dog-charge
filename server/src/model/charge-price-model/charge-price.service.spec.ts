import { Test, TestingModule } from '@nestjs/testing';
import { ChargePriceModelService } from './charge-price-model.service';

describe('ChargePriceModelService', () => {
  let service: ChargePriceModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargePriceModelService],
    }).compile();

    service = module.get<ChargePriceModelService>(ChargePriceModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
