import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { AffiliateModule } from './affiliate/affiliate.module';
import { EmployeeModule } from './employee/employee.module';
import { BeneficiaryAffiliateService } from './beneficiary-affiliate/beneficiary-affiliate.service';
import { BeneficiaryAffiliateModule } from './beneficiary-affiliate/beneficiary-affiliate.module';


@Module({
   imports:[LocationModule,AffiliateModule,EmployeeModule, BeneficiaryAffiliateModule],
   providers: [BeneficiaryAffiliateService]

})
export class ThirdsModule {}
