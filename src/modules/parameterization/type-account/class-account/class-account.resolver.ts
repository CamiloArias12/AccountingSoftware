import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClassAccountService } from './class-account.service';
import { ClassAccount } from './class-account.entity';
import { CreateClassAccountDto } from './dto/createClassAccount.dto';
import { UpdateClassAccountDto } from './dto/updateClassAccount.dto';

@Resolver(() => ClassAccount)
export class ClassAccountResolver {
    constructor(private readonly classAccountService: ClassAccountService) { }

    @Mutation(() => ClassAccount)
    async createClassAccount(@Args('input') input: CreateClassAccountDto): Promise<ClassAccount> {
        return await this.classAccountService.create(input);
    }

    @Query(() => [ClassAccount])
    async allClassAccounts(): Promise<ClassAccount[]> {
        return await this.classAccountService.findAll();
    }

    @Query(() => ClassAccount)
    async classAccount(@Args('code') code: number): Promise<ClassAccount> {
        return await this.classAccountService.findOne(code);
    }

    @Mutation(() => ClassAccount)
    async updateClassAccount(
        @Args('code') code: number,
        @Args('input') input: UpdateClassAccountDto,
    ): Promise<ClassAccount> {
        return await this.classAccountService.update(code, input);
    }

    @Mutation(() => Boolean)
    async deleteClassAccount(@Args('code') code: number): Promise<boolean> {
        await this.classAccountService.remove(code);
        return true;
    }
}

