import { Module } from '@nestjs/common';
import { TypeCreditResolver } from './type-credit.resolver';
import { TypeCreditService } from './type-credit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCredit } from './type-credit.entity';
import { ClassAccountService } from '../type-account/class-account/class-account.service';
import { ClassAccount } from '../type-account/class-account/class-account.entity';
import { TypeAccountModule } from '../type-account/type-account.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([TypeCredit]),
    TypeAccountModule  
  ],
  providers: [TypeCreditResolver, TypeCreditService]
})
export class TypeCreditModule {}




