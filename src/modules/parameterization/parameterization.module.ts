import { Module } from '@nestjs/common';
import { ThirdsModule } from './thirds/thirds.module';
import { AccountService } from './account/account.service';
import { AccountResolver } from './account/account.resolver';
import { AccountModule } from './account/account.module';
import { CreditService } from './credit/credit.service';
import { CreditModule } from './credit/credit.module';
import { SavingResolver } from './saving/saving.resolver';
import { TypeSavingResolver } from './type-saving/type-saving.resolver';
import { TypeSavingService } from './type-saving/type-saving.service';
import { TypeSavingModule } from './type-saving/type-saving.module';
import { TypeCreditgModule } from './type-creditg/type-creditg.module';
import { TypeCreditModule } from './type-credit/type-credit.module';

@Module({
   imports:[ThirdsModule, AccountModule, CreditModule, TypeSavingModule, TypeCreditgModule, TypeCreditModule],
   providers: [AccountService, AccountResolver, CreditService, SavingResolver, TypeSavingResolver, TypeSavingService]
})
export class ParameterizationModule {}
