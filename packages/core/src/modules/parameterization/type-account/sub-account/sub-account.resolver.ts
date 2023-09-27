import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubAccountService } from './sub-account.service';
import { SubAccount } from './sub-account.entity';
import { CreateSubAccountDto } from './dto/createSubAccount.dto';
import { UpdateSubAccountDto } from './dto/updateSubAccount.dto';

@Resolver(() => SubAccount)
export class SubAccountResolver {
    constructor(private readonly subAccountService: SubAccountService) { }

    @Mutation(returns => SubAccount)
    async createSubAccount(@Args('input') createSubAccountDto: CreateSubAccountDto): Promise<SubAccount> {
        return this.subAccountService.create(createSubAccountDto);
    }

    @Query(() => [SubAccount])
    async allSubAccounts(): Promise<SubAccount[]> {
        return await this.subAccountService.findAll();
    }

    @Query(() => SubAccount)
    async subAccount(@Args('code') code: number): Promise<SubAccount> {
        return await this.subAccountService.findOne(code);
    }


}
