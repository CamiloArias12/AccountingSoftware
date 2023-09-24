import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClassAccountService } from './class-account.service';
import { ClassAccount } from './class-account.entity';
import { TypeAccount } from '../type-account.entity';

@Resolver(() => ClassAccount)
export class ClassAccountResolver {
  constructor(private readonly classAccountService: ClassAccountService) {}


  @Query(() => ClassAccount)
  async classAccount(@Args('code') code: number): Promise<ClassAccount> {
    return await this.classAccountService.findOne(code);
  }

    
}

