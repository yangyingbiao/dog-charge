import { Test, TestingModule } from '@nestjs/testing';
import { MerchantModelService } from './merchant-model.service';

describe('MerchantModelService', () => {
  let service: MerchantModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerchantModelService],
    }).compile();

    service = module.get<MerchantModelService>(MerchantModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
