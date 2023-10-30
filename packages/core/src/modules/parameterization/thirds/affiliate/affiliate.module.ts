import { Module } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { AffiliateResolver } from './affiliate.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affiliate } from './affiliate.entity';
import { BeneficiaryAffiliate } from './beneficiary-affiliate/beneficiary-affiliate.entity';
import { BeneficiaryService } from './beneficiary/beneficiary.service';
import { BeneficiaryAffiliateService } from './beneficiary-affiliate/beneficiary-affiliate.service';
import { Beneficiary } from './beneficiary/beneficiary.entity';

@Module({

  imports:[TypeOrmModule.forFeature([Affiliate,BeneficiaryAffiliate,Beneficiary])],
  providers: [AffiliateService, AffiliateResolver,BeneficiaryService,BeneficiaryAffiliateService],
  exports :[AffiliateService]
})
export class AffiliateModule {}
