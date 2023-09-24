import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AffiliateModule } from '../affiliate/affiliate.module';
import { EmployeeModule } from '../employee/employee.module';
import { ProviderModule } from '../provider/provider.module';

@Module({
   imports:[TypeOrmModule.forFeature([User]),AffiliateModule,EmployeeModule,ProviderModule ],
   providers: [UserService,UserResolver],
   exports:[UserService]
})
export class UserModule {}
