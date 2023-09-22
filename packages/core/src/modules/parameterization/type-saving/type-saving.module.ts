import { Module } from '@nestjs/common';
import { TypeSavingResolver } from './type-saving.resolver';
import { TypeSavingService } from './type-saving.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSaving } from './type-saving.entity';
import { ClassAccountService } from '../type-account/class-account/class-account.service';
import { ClassAccount } from '../type-account/class-account/class-account.entity';
import { TypeAccountModule } from '../type-account/type-account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeSaving]),
    TypeAccountModule  
  ],
  providers: [TypeSavingResolver, TypeSavingService],
})
export class TypeSavingModule {}

