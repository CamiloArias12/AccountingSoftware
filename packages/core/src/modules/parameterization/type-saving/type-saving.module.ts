import { Module } from '@nestjs/common';
import { TypeSavingResolver } from './type-saving.resolver';
import { TypeSavingService } from './type-saving.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSaving } from './type-saving.entity';
import { ClassAccountService } from '../type-account/class-account/class-account.service';
import { ClassAccount } from '../type-account/class-account/class-account.entity';
import { TypeAccountModule } from '../type-account/type-account.module';
import { TypeSavingAccountService } from './type-saving-account/type-saving-account.service';
import { TypeSavingAccount } from './type-saving-account/type-saving-account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeSaving, TypeSavingAccount]),
    TypeAccountModule,
  ],
  providers: [TypeSavingResolver, TypeSavingService, TypeSavingAccountService],
  exports: [TypeSavingService],
})
export class TypeSavingModule {}
