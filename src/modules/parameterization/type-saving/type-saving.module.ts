import { Module } from '@nestjs/common';
import { TypeSavingResolver } from './type-saving.resolver';
import { TypeSavingService } from './type-saving.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSaving } from './type-saving.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeSaving])],
  providers: [TypeSavingResolver, TypeSavingService],
})
export class TypeSavingModule {}

