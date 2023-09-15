import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiaryAffiliateService } from './beneficiary-affiliate.service';

describe('BeneficiaryAffiliateService', () => {
  let service: BeneficiaryAffiliateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeneficiaryAffiliateService],
    }).compile();

    service = module.get<BeneficiaryAffiliateService>(BeneficiaryAffiliateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
