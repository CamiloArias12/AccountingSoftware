import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubAccountService } from './sub-account.service';
import { SubAccount } from './sub-account.entity';

@Resolver(() => SubAccount)
export class SubAccountResolver {
    constructor(private readonly subAccountService: SubAccountService) { }

    @Query(() => [SubAccount])
    async allSubAccounts(): Promise<SubAccount[]> {
        return await this.subAccountService.findAll();
    }

    @Query(() => SubAccount)
    async subAccount(@Args('code') code: number): Promise<SubAccount> {
        return await this.subAccountService.findOne(code);
    }


}

