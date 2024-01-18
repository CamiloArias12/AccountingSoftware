import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditService } from './credit.service';
import { CreditResolver } from './credit.resolver';
import { Credit } from './credit.entity';
import { Installment } from './installments/installment.entity';
import { InstallmentsService } from './installments/installments.service';
import { TypeCreditModule } from 'src/modules/parameterization/type-credit/type-credit.module';
import { AffiliateModule } from 'src/modules/parameterization/thirds/affiliate/affiliate.module';
import { InstallmentResolver } from './installments/installments.resolver';
import { TreasuryModule } from 'src/modules/treasury/treasury.module';
import { CreditDownloadService } from './credit-download.service';
import { CreditController } from './credit.controller';
import { CreditSubscriber } from './credit.subscriber';

@Module({
  controllers: [CreditController],
  providers: [
    CreditResolver,
    CreditService,
    InstallmentsService,
    InstallmentResolver,
    CreditDownloadService,
    CreditSubscriber,
  ],
  imports: [
    TypeOrmModule.forFeature([Credit, Installment]),
    TypeCreditModule,
    AffiliateModule,
    forwardRef(() => TreasuryModule),
  ],
  exports: [InstallmentsService, CreditService],
})
export class CreditModule {}
