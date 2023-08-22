import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeneficiaryAffiliate } from './beneficiary-affiliate.entity';

@Module({

   imports:[TypeOrmModule.forFeature([BeneficiaryAffiliate])],
})
export class BeneficiaryAffiliateModule {}
