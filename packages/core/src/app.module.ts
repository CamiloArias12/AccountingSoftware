import { Module } from '@nestjs/common';
import { ParameterizationModule } from './modules/parameterization/parameterization.module';
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
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { ViewCredit } from './modules/wallet/credit/credit-view.entity';
import { ViewSaving } from './modules/wallet/saving/saving-view.entity';
import { Company } from './modules/parameterization/thirds/company/company.entity';
import { DateScalar } from './scalar-type';
import { CreditAccount } from './modules/treasury/credit-account/credit-account.entity';
import { InstallmentAccount } from './modules/treasury/installment-account/installment-account.entity';
import { TreasuryModule } from './modules/treasury/treasury.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [ParameterizationModule, WalletModule,TreasuryModule,
	 GraphQLModule.forRoot(
	 {
	    driver: ApolloDriver,
	    autoSchemaFile: join(process.cwd(), 'src/schema.gql')
	 }
	 ),
      ConfigModule.forRoot({
	    envFilePath:'.env',
	    isGlobal:true,
	 }
      ),
      MulterModule.register({dest:'./uploads'}),
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
	    entities:[Affiliate,Beneficiary,BeneficiaryAffiliate,User,Employee,TypeAccount,Account,SubAccount,ClassAccount,Auxiliary,Group,TypeCredit,TypeSaving,Provider,Credit,ViewCredit,Installment,Saving,ViewSaving,CreditAccount,Company,InstallmentAccount]
	 }
      ),
    ],
  providers: [AppService,DateScalar]

})
export class AppModule { }
