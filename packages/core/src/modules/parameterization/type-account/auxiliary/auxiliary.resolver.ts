import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuxiliaryService } from './auxiliary.service';
import { Auxiliary } from './auxiliary.entity';
import { CreateAuxiliaryDto } from './dto/createAuxiliary.dto';
import { UpdateAuxiliaryDto } from './dto/updateAuxiliary.dto';

@Resolver(() => Auxiliary)
export class AuxiliaryResolver {
    constructor(private readonly auxiliaryService: AuxiliaryService) { }

    @Mutation(() => Auxiliary)
    async createAuxiliary(@Args('input') input: CreateAuxiliaryDto): Promise<Auxiliary> {
        return await this.auxiliaryService.create(input);
    }

    @Query(() => [Auxiliary])
    async allAuxiliaries(): Promise<Auxiliary[]> {
        return await this.auxiliaryService.findAll();
    }

    @Query(() => Auxiliary)
    async auxiliary(@Args('code') code: number): Promise<Auxiliary> {
        return await this.auxiliaryService.findOne(code);
    }

    @Mutation(() => Auxiliary)
    async updateAuxiliary(
        @Args('code') code: number,
        @Args('input') input: UpdateAuxiliaryDto,
    ): Promise<Auxiliary> {
        return await this.auxiliaryService.update(code, input);
    }

    @Mutation(() => Boolean)
    async deleteAuxiliary(@Args('code') code: number): Promise<boolean> {
        await this.auxiliaryService.remove(code);
        return true;
    }
}

