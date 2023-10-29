import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { InstallmentAccount } from './installment-account.entity';
import { InputCreateInstallmentAccount } from './dto/create-installment-account';
import { InstallmentAccountService } from './installment-account.service';


@Resolver(() => InstallmentAccount)
export class InstallmentAccountResolver{
    constructor(
        private readonly installmentAccountService: InstallmentAccountService
    ) { }

    @Mutation(() => Boolean)
    async createInstallmentAccount(@Args('data') input: InputCreateInstallmentAccount): Promise<Boolean> {
        return await this.installmentAccountService.create(input.installments,input.date,input.concept)
    }

    
}






