import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { AffiliateModule } from './affiliate/affiliate.module';
import { EmployeeModule } from './employee/employee.module';
import { ProviderModule } from './provider/provider.module';


@Module({
   imports:[LocationModule,AffiliateModule,EmployeeModule,ProviderModule ],
   providers: []

})
export class ThirdsModule {}
