import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TypeCreditService } from './type-credit.service';
import { TypeCredit } from './type-credit.entity';
import { CreateTypeCreditDto } from './dto/createTypeCredit.dto';
import { ClassAccountService } from '../type-account/class-account/class-account.service';
import { UpdateTypeCreditDto } from './dto/updateTypeCredit.dto';

@Resolver(() => TypeCredit)
export class TypeCreditResolver {
    constructor(
        private readonly typeCreditService: TypeCreditService
    ) { }

    @Mutation(() => TypeCredit)
    async createTypeCredit(@Args('data') createTypeCreditDto: CreateTypeCreditDto): Promise<TypeCredit> {
        return await this.typeCreditService.createTypeCredit(createTypeCreditDto);
    }

    @Mutation(() => TypeCredit)
    async updateTypeCredit(@Args('data') updateTypeCreditDto: UpdateTypeCreditDto): Promise<TypeCredit> {
        return await this.typeCreditService.updateOrCreateTypeCredit(updateTypeCreditDto);
    }

}






