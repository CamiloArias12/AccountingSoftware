import { Test, TestingModule } from '@nestjs/testing';
import { ProviderResolver } from './provider.resolver';
import { ProviderService } from './provider.service';

describe('ProviderResolver', () => {
  let resolver: ProviderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderResolver, ProviderService],
    }).compile();

    resolver = module.get<ProviderResolver>(ProviderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
