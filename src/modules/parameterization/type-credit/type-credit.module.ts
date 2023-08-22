import { Module } from '@nestjs/common';
import { TypeCreditService } from './type-credit.service';
import { TypeCreditResolver } from './type-credit.resolver';

@Module({
  providers: [TypeCreditService, TypeCreditResolver]
})
export class TypeCreditModule {}
