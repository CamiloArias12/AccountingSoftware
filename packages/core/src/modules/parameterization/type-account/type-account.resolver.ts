import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TypeAccount } from './type-account.entity';
import { TypeAccountService } from './type-account.service';
import { TypeAccountEnum } from './dto/enum-type';
import { TypeAccountInput } from './dto/type-account-input';
import { StatisticsAccount } from './dto/types';
@Resolver(() => TypeAccount)
export class TypeAccountResolver {
  constructor(private readonly typeAccountService: TypeAccountService) {}
  private sleep = async (milliseconds) => {
    await new Promise((resolve) => {
      return setTimeout(resolve, milliseconds);
    });
  };

  @Mutation(() => Boolean)
  async createAccount(
    @Args('createTypeAccount') createAccountInput: TypeAccountInput,
    @Args('type', { nullable: true }) type?: TypeAccountEnum,
    @Args('referenceTypeAccount', { nullable: true }) code?: number,
  ): Promise<boolean> {
    return this.typeAccountService.create(createAccountInput, type, code);
  }

  @Query(() => [TypeAccount])
  async allTypeAccount(): Promise<TypeAccount[]> {
    return this.typeAccountService.findAll();
  }
  @Mutation(() => Boolean)
  async deleteAccount(
    @Args('code', { type: () => Int }) identification: number,
  ) {
    return this.typeAccountService.delete(identification);
  }
 @Query(() => [StatisticsAccount])
 async statisticsAccount(
    @Args('code', { type: () => Int }) code: number,
    @Args('type', { type: () => String}) typeAccount: TypeAccountEnum,
        
 ): Promise<StatisticsAccount[]> {
    return this.typeAccountService.getStatisticsAccount(code,typeAccount)
  }

  @Mutation(() => Boolean)
  async updateStatusAccount(
    @Args('code') code: number,
    @Args('status') status: boolean,
  ): Promise<Boolean> {
    return this.typeAccountService.updateStatus(code, status);
  }

  @Mutation(() => Boolean)
  async updateAccount(
    @Args('updateTypeAccount') updateDto: TypeAccountInput,
    @Args('code') code: number,
  ): Promise<Boolean> {
    return this.typeAccountService.update(code, updateDto);
  }

  @Query(() => TypeAccount)
  async getAccountById(@Args('code') code: number): Promise<TypeAccount> {
    return this.typeAccountService.findOne(code);
  }
}
