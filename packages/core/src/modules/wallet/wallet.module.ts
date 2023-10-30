import { Module } from '@nestjs/common';
import { CreditModule } from './credit/credit.module';
import { SavingModule } from './saving/saving.module';

@Module({
  imports: [CreditModule, SavingModule]
})
export class WalletModule {}
