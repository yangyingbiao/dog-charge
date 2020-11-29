import { Test, TestingModule } from '@nestjs/testing';
import { ChargeOrderModelService } from './charge-order-model.service';

describe('ChargeOrderModelService', () => {
  let service: ChargeOrderModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargeOrderModelService],
    }).compile();

    service = module.get<ChargeOrderModelService>(ChargeOrderModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
