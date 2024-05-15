import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClassAccountService } from './class-account.service';
import { ClassAccount } from './class-account.entity';
import { TypeAccount } from '../type-account.entity';
import { ClassAccountStatistics } from '../dto/types';

@Resolver(() => ClassAccount)
export class ClassAccountResolver {
  constructor(private readonly classAccountService: ClassAccountService) {}

  @Query(() => ClassAccount)
  async getClassAccount(@Args('code') code: number): Promise<ClassAccount> {
    return await this.classAccountService.findOne(code);
  }

  @Query(() => [ClassAccount])
  async getClassAccountAll(): Promise<ClassAccount[]> {
    return this.classAccountService.findAll();
  }

  @Query(() => [ClassAccountStatistics])
  async getClassAccountStatics(): Promise<ClassAccountStatistics[]> {
    return this.classAccountService.getStatics();
  }
}
