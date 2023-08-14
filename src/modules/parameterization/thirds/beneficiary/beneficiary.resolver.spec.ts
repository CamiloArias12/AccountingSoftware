import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiaryResolver } from './beneficiary.resolver';

describe('BeneficiaryResolver', () => {
  let resolver: BeneficiaryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeneficiaryResolver],
    }).compile();

    resolver = module.get<BeneficiaryResolver>(BeneficiaryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
