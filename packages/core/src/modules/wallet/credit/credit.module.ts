import { Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditResolver } from './credit.resolver';

@Module({
  providers: [CreditResolver, CreditService],
  imports: [],
})
export class CreditModule {}
