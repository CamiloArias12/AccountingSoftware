import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditService } from './credit.service';
import { CreditResolver } from './credit.resolver';
import { Credit } from './credit.entity';
import { Installment } from './installments/installment.entity';
import { InstallmentsService } from './installments/installments.service';
import { TypeCreditModule } from 'src/modules/parameterization/type-credit/type-credit.module';
import { AffiliateModule } from 'src/modules/parameterization/thirds/affiliate/affiliate.module';
import { InstallmentResolver } from './installments/installments.resolver';

@Module({
  providers: [CreditResolver, CreditService, InstallmentsService,InstallmentResolver],
  imports: [TypeOrmModule.forFeature([Credit, Installment]),TypeCreditModule,AffiliateModule],  
  exports:[InstallmentsService,CreditService]
})
export class CreditModule {}


