import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubAccountService } from './sub-account.service';
import { SubAccount } from './sub-account.entity';

@Resolver(() => SubAccount)
export class SubAccountResolver {
    constructor(private readonly subAccountService: SubAccountService) { }

    @Query(() => [SubAccount])
    async getSubAccountAll(): Promise<SubAccount[]> {
        return await this.subAccountService.findAll();
    }

    @Query(() => SubAccount)
    async getSubAccount(@Args('code') code: number): Promise<SubAccount> {
        return await this.subAccountService.findOne(code);
    }
   @Query(() => [SubAccount])
    async getSubAccountByAccount(@Args('code') code:number): Promise<SubAccount[]> {
        return await this.subAccountService.findByAccount(code);
    }



}

