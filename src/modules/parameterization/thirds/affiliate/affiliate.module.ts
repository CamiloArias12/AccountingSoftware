import { Module } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { AffiliateResolver } from './affiliate.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affiliate } from './affiliate.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { BeneficiaryAffiliateModule } from '../beneficiary-affiliate/beneficiary-affiliate.module';

@Module({

  imports:[TypeOrmModule.forFeature([Affiliate]),UserModule ,BeneficiaryAffiliateModule],
  providers: [AffiliateService, AffiliateResolver]
})
export class AffiliateModule {}
