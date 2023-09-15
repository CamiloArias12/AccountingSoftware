import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';

@Resolver(() => Account)
export class AccountResolver {
    constructor(private readonly accountService: AccountService) { }

    @Mutation(() => Account)
    async createAccount(@Args('input') input: CreateAccountDto): Promise<Account> {
        return await this.accountService.create(input);
    }

    @Query(() => [Account])
    async allAccounts(): Promise<Account[]> {
        return await this.accountService.findAll();
    }

    @Query(() => Account)
    async account(@Args('code') code: number): Promise<Account> {
        return await this.accountService.findOne(code);
    }

    @Mutation(() => Account)
    async updateAccount(
        @Args('code') code: number,
        @Args('input') input: UpdateAccountDto,
    ): Promise<Account> {
        return await this.accountService.update(code, input);
    }

    @Mutation(() => Boolean)
    async deleteAccount(@Args('code') code: number): Promise<boolean> {
        await this.accountService.remove(code);
        return true;
    }
}

