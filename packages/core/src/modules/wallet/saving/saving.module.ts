import { Module } from '@nestjs/common';
import { SavingService } from './saving.service';
import { SavingResolver } from './saving.resolver';

@Module({
  providers: [SavingResolver, SavingService],
})
export class SavingModule {}
