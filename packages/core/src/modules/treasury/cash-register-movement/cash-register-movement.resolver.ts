import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { MovementOutput } from '../deferred-movement/dto/types';
import { CashRegisterMovement } from './cash-register-movement.entity';
import { CashRegisterMovementService } from './cash-register-movement.service';
import { PaymentInstallmentInput, ResultMovementCash } from './dto/types';
import { InstallmentPayment } from 'src/modules/wallet/credit/installments/dto/types';
import { ViewSaving } from 'src/modules/wallet/saving/saving-view.entity';
import { SavingPayment } from 'src/modules/wallet/saving/dto/types';
import { NoteMovement } from '../note-movement/note-movement.entity';
import { NotePayment } from '../note-movement/dto/types';
import { InputSearchMovement } from '../movement/dto/types';

@Resolver(() => CashRegisterMovement)
export class CashRegisterMovementResolver {
  constructor(
    private readonly cashRegisterMovementService: CashRegisterMovementService,
  ) {}

  @Query(() => [MovementOutput])
  async findMovementsCashRegister(
    @Args('data', { type: () => InputSearchMovement })
    data: InputSearchMovement,
  ) {
    return await this.cashRegisterMovementService.find(data);
  }
  @Mutation(() => Boolean)
  async createPaymentInstallment(@Args('data') data: PaymentInstallmentInput) {
    return await this.cashRegisterMovementService.createInstallmentPayment(
      data,
    );
  }
  @Mutation(() => Boolean)
  async createNoteCash(@Args('data') data: NotePayment) {
    return await this.cashRegisterMovementService.createNoteCash(data);
  }

  @Mutation(() => Boolean)
  async createPaymentSaving(@Args('data') data: SavingPayment) {
    return await this.cashRegisterMovementService.createCashSaving(data);
  }

  @Mutation(() => [InstallmentPayment])
  async getAllInstallments(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<InstallmentPayment[]> {
    return await this.cashRegisterMovementService.findAllIsntallmentPayment(
      startDate,
      endDate,
    );
  }

  @Mutation(() => [ViewSaving])
  async getSavingCash(@Args('date') date: Date): Promise<ViewSaving[]> {
    return await this.cashRegisterMovementService.findAllSavingCash(date);
  }

  @Query(() => [ResultMovementCash])
  async findCashByMovement(@Args('movement') movement: string) {
    return await this.cashRegisterMovementService.findByMovement(movement);
  }
}
