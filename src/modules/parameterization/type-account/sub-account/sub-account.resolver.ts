import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubAccountService } from './sub-account.service';
import { SubAccount } from './sub-account.entity';
import { CreateSubAccountDto } from './dto/createSubAccount.dto';
import { UpdateSubAccountDto } from './dto/updateSubAccount.dto';

@Resolver(() => SubAccount)
export class SubAccountResolver {
    constructor(private readonly subAccountService: SubAccountService) { }

    @Mutation(() => SubAccount)
    async createSubAccount(@Args('input') input: CreateSubAccountDto): Promise<SubAccount> {
        return await this.subAccountService.create(input);
    }

    @Query(() => [SubAccount])
    async allSubAccounts(): Promise<SubAccount[]> {
        return await this.subAccountService.findAll();
    }

    @Query(() => SubAccount)
    async subAccount(@Args('code') code: number): Promise<SubAccount> {
        return await this.subAccountService.findOne(code);
    }

    @Mutation(() => SubAccount)
    async updateSubAccount(
        @Args('code') code: number,
        @Args('input') input: UpdateSubAccountDto,
    ): Promise<SubAccount> {
        return await this.subAccountService.update(code, input);
    }

    @Mutation(() => Boolean)
    async deleteSubAccount(@Args('code') code: number): Promise<boolean> {
        await this.subAccountService.remove(code);
        return true;
    }
}

