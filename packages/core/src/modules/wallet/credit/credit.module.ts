import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditService } from './credit.service';
import { CreditResolver } from './credit.resolver';
import { Credit } from './credit.entity';
import { Installment } from './installments/installment.entity';
import { InstallmentsService } from './installments/installments.service';
import { InstallmentsResolver } from './installments/installments.resolver';

@Module({
  providers: [CreditResolver, CreditService, InstallmentsService, InstallmentsResolver],
  imports: [TypeOrmModule.forFeature([Credit, Installment])],  
})
export class CreditModule {}


