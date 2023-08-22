import { Test, TestingModule } from '@nestjs/testing';
import { DataAccountService } from './data-account.service';

describe('DataAccountService', () => {
  let service: DataAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAccountService],
    }).compile();

    service = module.get<DataAccountService>(DataAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
