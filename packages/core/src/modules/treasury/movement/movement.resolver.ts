import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { InputCreateInstallmentAccount } from './dto/create-installment-account';
import { Movement } from './movement.entity';
import { MovementService } from './movement.service';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';

@Resolver(() => Movement)
export class MovementResolver {
  constructor(private readonly movementService: MovementService) {}

  @Query(() => [Movement])
  async findAllMovement() {
    return await this.movementService.find();
  }

  @Mutation(() => ResponseGraphql)
  async deleteMovementById(@Args('id') id: string) {
    return this.movementService.delete(id);
  }
}
