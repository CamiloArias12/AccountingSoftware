import { Test, TestingModule } from '@nestjs/testing';
import { AffiliateResolver } from './affiliate.resolver';

describe('AffiliateResolver', () => {
  let resolver: AffiliateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AffiliateResolver],
    }).compile();

    resolver = module.get<AffiliateResolver>(AffiliateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
