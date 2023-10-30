import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CompanyModule } from './company/company.module';


@Module({
   imports:[UserModule,LocationModule,AuthModule,CompanyModule ],
   providers: []

})
export class ThirdsModule {}
