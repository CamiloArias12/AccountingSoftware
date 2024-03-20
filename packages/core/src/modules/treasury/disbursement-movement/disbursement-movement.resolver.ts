import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreditDisbursementInput, ResultDisbursement } from './dto/types';
import { DisbursementMovement } from './disbursement-movement.entity';
import { DisbursementMovementService } from './disbursement-movement.service';
import { MovementOutput } from '../deferred-movement/dto/types';
import { NotePayment } from '../note-movement/dto/types';
import { ViewCredit } from 'src/modules/wallet/credit/credit-view.entity';
import { InputSearchMovement } from '../movement/dto/types';

@Resolver(() => DisbursementMovement)
export class DisbursementMovementResolver {
  constructor(
    private readonly disbursementMovementService: DisbursementMovementService,
  ) {}

  @Query(() => [MovementOutput])
  async findMovementsDisbursement(
    @Args('data', { type: () => InputSearchMovement })
    data: InputSearchMovement,
  ) {
    return await this.disbursementMovementService.find(data);
  }

  @Mutation(() => Boolean)
  async createDisbursementPayment(@Args('data') data: CreditDisbursementInput) {
    return await this.disbursementMovementService.createDisbursementPayment(
      data,
    );
  }
  @Mutation(() => [ViewCredit])
  async findCreditByDatePayment(
    @Args('date', { type: () => Date }) date: Date,
  ) {
    return this.disbursementMovementService.findByDateStateDisbursement(date);
  }

  @Mutation(() => Boolean)
  async createNoteDisbursement(@Args('data') data: NotePayment) {
    return await this.disbursementMovementService.createNoteDisbursement(data);
  }
  @Query(() => [ResultDisbursement])
  async findDisbursementhByMovement(@Args('movement') movement: string) {
    return await this.disbursementMovementService.findByMovement(movement);
  }
}
