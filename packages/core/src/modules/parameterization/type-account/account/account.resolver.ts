import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from './account.entity';

@Resolver(() => Account)
export class AccountResolver {
    constructor(private readonly accountService: AccountService) { }


    @Query(() => [Account])
    async getAccountAll(): Promise<Account[]> {
        return await this.accountService.findAll();
    }
   
    @Query(() => [Account])
    async getAccountsByGroup(@Args('code') code:number): Promise<Account[]> {
        return await this.accountService.findByGroup(code);
    }


    @Query(() => Account)
    async getAccount(@Args('code') code: number): Promise<Account> {
        return await this.accountService.findOne(code);
    }

}

