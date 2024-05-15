import { Test, TestingModule } from '@nestjs/testing';
import { ContributionService } from './contribution.service';
import { ContributionResolver } from './contribution.resolver';

describe('ContributionsResolver', () => {
  let resolver: ContributionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContributionResolver, ContributionService],
    }).compile();

    resolver = module.get<ContributionResolver>(ContributionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
