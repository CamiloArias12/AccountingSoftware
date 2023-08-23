import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TypeSavingService } from './type-saving.service';
import { TypeSaving } from './type-saving.entity';
import { CreateTypeSavingDto } from './dto/createTypeSaving.dto';
import { UpdateTypeSavingDto } from './dto/updateTypeSaving.dto';

@Resolver(() => TypeSaving)
export class TypeSavingResolver {
    constructor(private readonly typeSavingService: TypeSavingService) {}

    @Mutation(() => TypeSaving)
    async createTypeSaving(@Args('input') input: CreateTypeSavingDto): Promise<TypeSaving> {
        return await this.typeSavingService.create(input);
    }

    @Query(() => [TypeSaving])
    async allTypeSavings(): Promise<TypeSaving[]> {
        return await this.typeSavingService.findAll();
    }

    @Query(() => TypeSaving)
    async typeSaving(@Args('id') id: number): Promise<TypeSaving> {
        return await this.typeSavingService.findOne(id);
    }

    @Mutation(() => TypeSaving)
    async updateTypeSaving(
        @Args('id') id: number,
        @Args('input') input: UpdateTypeSavingDto,
    ): Promise<TypeSaving> {
        return await this.typeSavingService.update(id, input);
    }

    @Mutation(() => Boolean)
    async deleteTypeSaving(@Args('id') id: number): Promise<boolean> {
        await this.typeSavingService.remove(id);
        return true;
    }
}

