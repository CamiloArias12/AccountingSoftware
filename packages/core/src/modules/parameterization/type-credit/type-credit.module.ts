import { Module } from '@nestjs/common';
import { TypeCreditResolver } from './type-credit.resolver';
import { TypeCreditService } from './type-credit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCredit } from './type-credit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeCredit])],
  providers: [TypeCreditResolver, TypeCreditService],
})
export class TypeCreditModule {}

