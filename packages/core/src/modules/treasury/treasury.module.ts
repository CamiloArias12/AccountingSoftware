import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditAccount } from './credit-account/credit-account.entity';
import { InstallmentAccount } from './installment-account/installment-account.entity';
import { InstallmentAccountService } from './installment-account/installment-account.service';
import { TypeCreditModule } from '../parameterization/type-credit/type-credit.module';
import { CreditModule } from '../wallet/credit/credit.module';
import { InstallmentAccountResolver } from './installment-account/installment-account.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CreditAccount,InstallmentAccount]),TypeCreditModule,CreditModule],  
  providers:[InstallmentAccountService,InstallmentAccountResolver]
})
export class TreasuryModule {}
