import { Test, TestingModule } from '@nestjs/testing';
import { SmartItemService } from './smart-item.service';

describe('SmartItemService', () => {
  let service: SmartItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartItemService],
    }).compile();

    service = module.get<SmartItemService>(SmartItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
