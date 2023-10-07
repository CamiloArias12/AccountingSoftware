import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ParameterizationModule } from './modules/parameterization/parameterization.module';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeAccount } from './modules/parameterization/type-account/type-account.entity';
import { Account } from './modules/parameterization/type-account/account/account.entity';
import { SubAccount } from './modules/parameterization/type-account/sub-account/sub-account.entity';
import { ClassAccount } from './modules/parameterization/type-account/class-account/class-account.entity';
import { Auxiliary } from './modules/parameterization/type-account/auxiliary/auxiliary.entity';
import { Group } from './modules/parameterization/type-account/group/group.entity';
import { Affiliate } from './modules/parameterization/thirds/affiliate/affiliate.entity';
import { User } from './modules/parameterization/thirds/user/user.entity';
import { Employee } from './modules/parameterization/thirds/employee/employee.entity';
import { Beneficiary } from './modules/parameterization/thirds/affiliate/beneficiary/beneficiary.entity';
import { BeneficiaryAffiliate } from './modules/parameterization/thirds/affiliate/beneficiary-affiliate/beneficiary-affiliate.entity';
import { TypeCredit } from './modules/parameterization/type-credit/type-credit.entity';
import { TypeSaving } from './modules/parameterization/type-saving/type-saving.entity';
import { Provider } from './modules/parameterization/thirds/provider/provider.entity';
import { Installment } from './modules/wallet/credit/installments/installment.entity';
import { Credit } from './modules/wallet/credit/credit.entity';
import { WalletModule } from './modules/wallet/wallet.module';
import { Saving } from './modules/wallet/saving/saving.entity';

@Module({
	imports: [ParameterizationModule, WalletModule,
   ConfigModule.forRoot({
	    envFilePath:'.env',
	    isGlobal:true,
	 }
      ),
      TypeOrmModule.forRoot(
	 {
	    type: 'mysql',
	    host: process.env.HOST,
	    port: parseInt(process.env.PORT),
	    username: process.env.DATABASE_USER,
	    password: process.env.DATABASE_PASSWORD,
	    database: process.env.DATABASE_NAME,
	    keepConnectionAlive: true,
	    synchronize: true,
	    entities:[Affiliate,Beneficiary,BeneficiaryAffiliate,User,Employee,TypeAccount,Account,SubAccount,ClassAccount,Auxiliary,Group,TypeCredit,TypeSaving,Provider,Credit,Installment,Saving]
	 }
      ),
    ],
  providers: [AppService ]

})
export class AppModule { }
