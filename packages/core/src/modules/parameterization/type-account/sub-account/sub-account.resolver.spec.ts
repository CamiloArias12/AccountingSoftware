import { Test, TestingModule } from '@nestjs/testing';
import { SubAccountResolver } from './sub-account.resolver';

describe('SubAccountResolver', () => {
  let resolver: SubAccountResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubAccountResolver],
    }).compile();

    resolver = module.get<SubAccountResolver>(SubAccountResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
