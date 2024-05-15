import { Module } from '@nestjs/common';
import { TypeCreditResolver } from './type-credit.resolver';
import { TypeCreditService } from './type-credit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCredit } from './type-credit.entity';
import { ClassAccountService } from '../type-account/class-account/class-account.service';
import { ClassAccount } from '../type-account/class-account/class-account.entity';
import { TypeAccountModule } from '../type-account/type-account.module';
import { TypeCreditAccount } from './type-credit-account/type-credit-account.entity';
import { TypeCreditAccountService } from './type-credit-account/type-credit-account.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([TypeCredit,TypeCreditAccount]),
    TypeAccountModule  
  ],
  providers: [TypeCreditResolver, TypeCreditService,TypeCreditAccountService],
  exports:[TypeCreditService]
})
export class TypeCreditModule {}




