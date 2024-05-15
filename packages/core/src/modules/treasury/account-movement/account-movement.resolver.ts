import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AccountMovement } from './account-movement.entity';
import { AccountMovementService } from './account-movement.service';
import {
  BookAuxiliary,
  BookAuxiliaryData,
  MovementAccount,
  MovementAndAccount,
} from './dto/types';
import { Movement } from '../movement/movement.entity';
import { InputSearchMovement } from '../movement/dto/types';

@Resolver(() => AccountMovement)
export class AccountMovementResolver {
  constructor(
    private readonly accountMovementService: AccountMovementService,
  ) {}

  @Query(() => [Movement])
  async findMovementsAccount(
    @Args('data', { type: () => InputSearchMovement })
    data: InputSearchMovement,
  ) {
    return await this.accountMovementService.find(data);
  }
  @Query(() => [MovementAndAccount])
  async findMovementAccount(
    @Args('movements', { type: () => [String] }) movements: string[],
  ) {
    return await this.accountMovementService.findMovements(movements);
  }

  @Query(() => [BookAuxiliaryData])
  async getBookAuxiliary(
    @Args('data', { type: () => BookAuxiliary }) data: BookAuxiliary,
  ) {
    return await this.accountMovementService.getBook(data);
  }
}
