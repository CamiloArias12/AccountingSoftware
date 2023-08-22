import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { AffiliateModule } from './affiliate/affiliate.module';
import { EmployeeModule } from './employee/employee.module';
import { BeneficiaryAffiliateService } from './beneficiary-affiliate/beneficiary-affiliate.service';
import { BeneficiaryAffiliateModule } from './beneficiary-affiliate/beneficiary-affiliate.module';
import { AuthService } from './auth/auth.service';
import { AuthResolver } from './auth/auth.resolver';
import { AuthModule } from './auth/auth.module';

@Module({
   imports:[LocationModule,AffiliateModule,EmployeeModule, BeneficiaryAffiliateModule, AuthModule],
   providers: [BeneficiaryAffiliateService, AuthService, AuthResolver]

})
export class ThirdsModule {}
