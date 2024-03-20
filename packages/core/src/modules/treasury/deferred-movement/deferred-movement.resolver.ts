import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { MovementOutput, ResultMovementDeferred } from './dto/types';
import { DeferredMovementService } from './deferred-movement.service';
import { DeferredMovement } from './deferred-movement.entity';
import { PaymentInstallmentInput } from '../cash-register-movement/dto/types';
import { InstallmentPayment } from 'src/modules/wallet/credit/installments/dto/types';
import { ViewSaving } from 'src/modules/wallet/saving/saving-view.entity';
import { SavingPayment } from 'src/modules/wallet/saving/dto/types';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';
import { InputSearchMovement } from '../movement/dto/types';

@Resolver(() => DeferredMovement)
export class DeferredMovementResolver {
  constructor(private readonly deferredService: DeferredMovementService) {}

  @Query(() => [MovementOutput])
  async findDeferredAll(
    @Args('data', { type: () => InputSearchMovement }) data: InputSearchMovement,

  ) {
    return await this.deferredService.find(data);
  }

  @Mutation(() => ResponseGraphql)
  async createPaymentDeferredInterestInstallment(
    @Args('data') data: PaymentInstallmentInput,
  ) {
    return await this.deferredService.createDeferredInterestPayment(data);
  }
  @Mutation(() => ResponseGraphql)
  async createDeferredSaving(@Args('data') data: SavingPayment) {
    return await this.deferredService.createDeferredSaving(data);
  }

  @Query(() => [ResultMovementDeferred])
  async findDeferredByMovement(@Args('movement') movement: string) {
    return await this.deferredService.findByMovement(movement);
  }

  @Query(() => [InstallmentPayment])
  async getAllInstallmentsPaymentInterest(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<InstallmentPayment[]> {
    return await this.deferredService.findAllIsntallmentPaymentInterest(
      startDate,
      endDate,
    );
  }

  @Query(() => [ViewSaving])
  async getSavingDeferred(@Args('date') date: Date): Promise<ViewSaving[]> {
    return await this.deferredService.findAllSavingDeffered(date);
  }
}
