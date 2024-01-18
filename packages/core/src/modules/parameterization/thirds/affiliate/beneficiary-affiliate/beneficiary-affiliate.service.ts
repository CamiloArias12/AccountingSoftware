import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BeneficiaryAffiliate } from './beneficiary-affiliate.entity';
import { QueryRunner, Repository } from 'typeorm';
import { BeneficiaryService } from '../beneficiary/beneficiary.service';
import { Beneficiary } from '../beneficiary/beneficiary.entity';

@Injectable()
export class BeneficiaryAffiliateService {
  constructor(
    @InjectRepository(BeneficiaryAffiliate)
    private readonly beneficiaryAffiliateRepository: Repository<BeneficiaryAffiliate>,
    private readonly beneficiaryService: BeneficiaryService,
  ) {}

  async create(
    beneficiaryAffiliate: BeneficiaryAffiliate,
    queryRunner?: QueryRunner,
  ) {
    if (queryRunner) {
      return queryRunner.manager.save(
        BeneficiaryAffiliate,
        beneficiaryAffiliate,
      );
    } else {
      return this.beneficiaryAffiliateRepository.save(beneficiaryAffiliate);
    }
  }

  async update(
    beneficiaryAffiliate: BeneficiaryAffiliate,
    queryRunner?: QueryRunner,
  ) {
    if (queryRunner) {
      return queryRunner.manager.update(
        BeneficiaryAffiliate,
        {
          idAffiliate: beneficiaryAffiliate.idAffiliate,
          idBeneficiary: beneficiaryAffiliate.idBeneficiary,
        },
        {
          percentage: beneficiaryAffiliate.percentage,
        },
      );
    } else {
      return this.beneficiaryAffiliateRepository.save(beneficiaryAffiliate);
    }
  }

  async delete(
    idDocument: number,
    beneficiary: BeneficiaryAffiliate,
    queryRunner?: QueryRunner,
  ) {
    await queryRunner.manager.remove(BeneficiaryAffiliate, beneficiary);
  }
}
