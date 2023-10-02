import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingService } from './saving.service';
import { SavingResolver } from './saving.resolver';
import { Saving } from './saving.entity';

@Module({
  providers: [SavingResolver, SavingService],
  imports: [TypeOrmModule.forFeature([Saving])],  
})
export class SavingModule {}

