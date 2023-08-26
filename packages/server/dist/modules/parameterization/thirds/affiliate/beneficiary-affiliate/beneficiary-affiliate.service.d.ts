import { BeneficiaryAffiliate } from './beneficiary-affiliate.entity';
import { QueryRunner, Repository } from 'typeorm';
export declare class BeneficiaryAffiliateService {
    private readonly beneficiaryAffiliateRepository;
    constructor(beneficiaryAffiliateRepository: Repository<BeneficiaryAffiliate>);
    create(beneficiaryAffiliate: BeneficiaryAffiliate, queryRunner: QueryRunner | null): Promise<BeneficiaryAffiliate>;
}
