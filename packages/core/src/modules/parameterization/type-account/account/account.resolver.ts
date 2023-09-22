import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';

@Resolver(() => Account)
export class AccountResolver {
    constructor(private readonly accountService: AccountService) { }

    @Mutation(returns => Account)
    async createAccount(@Args('input') createAccountDto: CreateAccountDto): Promise<Account> {
        return this.accountService.create(createAccountDto);
    }

    @Query(() => [Account])
    async allAccounts(): Promise<Account[]> {
        return await this.accountService.findAll();
    }

    @Query(() => Account)
    async account(@Args('code') code: number): Promise<Account> {
        return await this.accountService.findOne(code);
    }

}

