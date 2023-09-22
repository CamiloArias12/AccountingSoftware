import { Module } from '@nestjs/common';
import { TypeSavingModule } from './type-saving/type-saving.module';
import { TypeCreditModule } from './type-credit/type-credit.module';
import { TypeAccountModule } from './type-account/type-account.module';
import { AffiliateModule } from './thirds/affiliate/affiliate.module';
import { ThirdsModule } from './thirds/thirds.module';

@Module({
   imports:[ThirdsModule,TypeAccountModule, TypeSavingModule,  TypeCreditModule],
})
export class ParameterizationModule {}
