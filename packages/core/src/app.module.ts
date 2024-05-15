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
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ViewCredit } from './modules/wallet/credit/credit-view.entity';
import { ViewSaving } from './modules/wallet/saving/saving-view.entity';
import { Company } from './modules/parameterization/thirds/company/company.entity';
import { DateScalar } from './scalar-type';
import { TreasuryModule } from './modules/treasury/treasury.module';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import { TypeCreditAccount } from './modules/parameterization/type-credit/type-credit-account/type-credit-account.entity';
import { Movement } from './modules/treasury/movement/movement.entity';
import { CreditMovement } from './modules/treasury/credit-movement/credit-movement.entity';
import { AccountMovement } from './modules/treasury/account-movement/account-movement.entity';
import { TypeSavingAccount } from './modules/parameterization/type-saving/type-saving-account/type-saving-account.entity';
import { DeferredMovement } from './modules/treasury/deferred-movement/deferred-movement.entity';
import { DisbursementMovement } from './modules/treasury/disbursement-movement/disbursement-movement.entity';
import { CashRegisterMovement } from './modules/treasury/cash-register-movement/cash-register-movement.entity';
import { Contribution } from './modules/wallet/contribution/contribution.entity';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Role } from './modules/parameterization/thirds/role/role.entity';
import { NoteMovement } from './modules/treasury/note-movement/note-movement.entity';
@Module({
  imports: [
    ParameterizationModule,
    WalletModule,
    TreasuryModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, '..', '..', '..', '.env'),
      isGlobal: true,
    }),
    MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      keepConnectionAlive: true,
      synchronize: true,
      entities: [
        Affiliate,
        Beneficiary,
        BeneficiaryAffiliate,
        User,
        Employee,
        TypeAccount,
        Account,
        SubAccount,
        ClassAccount,
        Auxiliary,
        Group,
        TypeCredit,
        TypeSaving,
        Provider,
        Credit,
        ViewCredit,
        Installment,
        Saving,
        ViewSaving,
        Movement,
        Company,
        TypeCreditAccount,
        CreditMovement,
        AccountMovement,
        TypeSavingAccount,
        DeferredMovement,
        DisbursementMovement,
        CashRegisterMovement,
        NoteMovement,
        Contribution,
        Role,
      ],
    }),
  ],
  providers: [AppService, DateScalar],
})
export class AppModule {}
