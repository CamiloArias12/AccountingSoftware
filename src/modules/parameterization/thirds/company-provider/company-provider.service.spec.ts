import { Test, TestingModule } from '@nestjs/testing';
import { CompanyProviderService } from './company-provider.service';

describe('CompanyProviderService', () => {
  let service: CompanyProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyProviderService],
    }).compile();

    service = module.get<CompanyProviderService>(CompanyProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
