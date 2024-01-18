import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditModule } from '../wallet/credit/credit.module';
import { Movement } from './movement/movement.entity';
import { CreditMovement } from './credit-movement/credit-movement.entity';
import { MovementService } from './movement/movement.service';
import { MovementResolver } from './movement/movement.resolver';
import { CreditMovementService } from './credit-movement/credit-movement.service';
import { CreditMovementResolver } from './credit-movement/credit-movement.resolver';
import { AccountMovement } from './account-movement/account-movement.entity';
import { AccountMovementService } from './account-movement/account-movement.service';
import { AccountMovementResolver } from './account-movement/account-movement.resolver';
import { CompanyModule } from '../parameterization/thirds/company/company.module';
import { UserModule } from '../parameterization/thirds/user/user.module';
import { TypeAccountModule } from '../parameterization/type-account/type-account.module';
import { DeferredMovement } from './deferred-movement/deferred-movement.entity';
import { DisbursementMovement } from './disbursement-movement/disbursement-movement.entity';
import { DisbursementMovementService } from './disbursement-movement/disbursement-movement.service';
import { DisbursementMovementResolver } from './disbursement-movement/disbursement-movement.resolver';
import { DeferredMovementService } from './deferred-movement/deferred-movement.service';
import { DeferredMovementResolver } from './deferred-movement/deferred-movement.resolver';
import { CashRegisterMovementService } from './cash-register-movement/cash-register-movement.service';
import { CashRegisterMovementResolver } from './cash-register-movement/cash-register-movement.resolver';
import { CashRegisterMovement } from './cash-register-movement/cash-register-movement.entity';
import { SavingModule } from '../wallet/saving/saving.module';
import { DisbursementMovementSubscriber } from './disbursement-movement/disbursement-movement.subscriber';
import { CashRegisterMovementSubscriber } from './cash-register-movement/cash-register-movement.subscriber';
import { AccountMovementDownloadService } from './account-movement/account-movement-download.service';
import { AccountMovementController } from './account-movement/account-movement.controller';
import { ContributionModule } from '../wallet/contribution/contribution.module';
import { DeferredMovementSubscriber } from './deferred-movement/deferred-movement.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movement,
      CreditMovement,
      AccountMovement,
      DeferredMovement,
      DisbursementMovement,
      CashRegisterMovement,
    ]),
    forwardRef(() => CreditModule),
    CompanyModule,
    UserModule,
    TypeAccountModule,
    SavingModule,
    ContributionModule,
  ],
  providers: [
    MovementService,
    MovementResolver,
    CreditMovementService,
    CreditMovementResolver,
    AccountMovementService,
    AccountMovementResolver,
    DisbursementMovementService,
    DisbursementMovementResolver,
    DeferredMovementService,
    DeferredMovementResolver,
    CashRegisterMovementService,
    CashRegisterMovementResolver,
    DisbursementMovementSubscriber,
    CashRegisterMovementSubscriber,
    AccountMovementDownloadService,
    DeferredMovementSubscriber,
  ],
  controllers: [AccountMovementController],
  exports: [CreditMovementService, AccountMovementService],
})
export class TreasuryModule {}
