import { Test, TestingModule } from '@nestjs/testing';
import { StationModelService } from './station-model.service';

describe('StationModelService', () => {
  let service: StationModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationModelService],
    }).compile();

    service = module.get<StationModelService>(StationModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
