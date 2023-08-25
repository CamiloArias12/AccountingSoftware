import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TypeCreditService } from './type-credit.service';
import { TypeCredit } from './type-credit.entity';
import { CreateTypeCreditDto } from './dto/createTypeCredit.dto';
import { UpdateTypeCreditDto } from './dto/updateTypeCredit.dto';

@Resolver(() => TypeCredit)
export class TypeCreditResolver {
    constructor(private readonly typeCreditService: TypeCreditService) {}

    @Mutation(() => TypeCredit)
    async createTypeCredit(@Args('input') input: CreateTypeCreditDto): Promise<TypeCredit> {
        return await this.typeCreditService.create(input);
    }

    @Query(() => [TypeCredit])
    async allTypeCredits(): Promise<TypeCredit[]> {
        return await this.typeCreditService.findAll();
    }

    @Query(() => TypeCredit)
    async typeCredit(@Args('id') id: number): Promise<TypeCredit> {
        return await this.typeCreditService.findOne(id);
    }

    @Mutation(() => TypeCredit)
    async updateTypeCredit(
        @Args('id') id: number,
        @Args('input') input: UpdateTypeCreditDto,
    ): Promise<TypeCredit> {
        return await this.typeCreditService.update(id, input);
    }

    @Mutation(() => Boolean)
    async deleteTypeCredit(@Args('id') id: number): Promise<boolean> {
        await this.typeCreditService.remove(id);
        return true;
    }
}

