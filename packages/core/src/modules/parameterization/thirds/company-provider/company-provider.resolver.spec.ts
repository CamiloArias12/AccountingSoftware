import { Test, TestingModule } from '@nestjs/testing';
import { CompanyProviderResolver } from './company-provider.resolver';

describe('CompanyProviderResolver', () => {
  let resolver: CompanyProviderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyProviderResolver],
    }).compile();

    resolver = module.get<CompanyProviderResolver>(CompanyProviderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
