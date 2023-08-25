import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ParameterizationModule } from './modules/parameterization/parameterization.module';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affiliate } from './modules/parameterization/thirds/affiliate/affiliate.entity';
import { User } from './modules/parameterization/thirds/user/user.entity';
import { Employee } from './modules/parameterization/thirds/employee/employee.entity';
import { TypeAccount } from './modules/parameterization/type-account/type-account.entity';
import { Account } from './modules/parameterization/type-account/account/account.entity';
import { SubAccount } from './modules/parameterization/type-account/sub-account/sub-account.entity';
import { ClassAccount } from './modules/parameterization/type-account/class-account/class-account.entity';
import { Auxiliary } from './modules/parameterization/type-account/auxiliary/auxiliary.entity';
import { Group } from './modules/parameterization/type-account/group/group.entity';
import { Beneficiary } from './modules/parameterization/thirds/affiliate/beneficiary/beneficiary.entity';
import { BeneficiaryAffiliate } from './modules/parameterization/thirds/affiliate/beneficiary-affiliate/beneficiary-affiliate.entity';

@Module({
  
  imports: [ParameterizationModule,
      GraphQLModule.forRoot(
	 {
	    driver:ApolloDriver,
	    autoSchemaFile:join(process.cwd(),'src/schema.gql')
	 }
      ),

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
	    entities:[User,Affiliate,Employee,Beneficiary,BeneficiaryAffiliate,TypeAccount,Account,SubAccount,ClassAccount,Auxiliary,Group]
	 }
      ),
    ],
  providers: [AppService ]

})
export class AppModule {}
