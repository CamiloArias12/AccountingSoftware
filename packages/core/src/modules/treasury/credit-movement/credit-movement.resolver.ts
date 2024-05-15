import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreditMovement } from './credit-movement.entity';
import { CreditMovementService } from './credit-movement.service';
import { CreditDisbursementInput } from './dto/types';

@Resolver(() => CreditMovement)
export class CreditMovementResolver {
  constructor(private readonly creditMovementService: CreditMovementService) {}

  @Query(() => [CreditMovement])
  async findMovementsCredit() {
    return await this.creditMovementService.find();
  }

  @Mutation(() => Boolean)
  async createDisbursementPayment(@Args('data') data: CreditDisbursementInput) {
    return await this.creditMovementService.createDisbursementPayment(data);
  }
}
