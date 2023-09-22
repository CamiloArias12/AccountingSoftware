import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuxiliaryService } from './auxiliary.service';
import { Auxiliary } from './auxiliary.entity';
import { CreateAuxiliaryDto } from './dto/createAuxiliary.dto';
import { UpdateAuxiliaryDto } from './dto/updateAuxiliary.dto';

@Resolver(() => Auxiliary)
export class AuxiliaryResolver {
    constructor(private readonly auxiliaryService: AuxiliaryService) { }

    @Mutation(returns => Auxiliary)
    async createAuxiliary(@Args('input') createAuxiliaryDto: CreateAuxiliaryDto): Promise<Auxiliary> {
        return this.auxiliaryService.create(createAuxiliaryDto);
    }

    @Query(() => [Auxiliary])
    async allAuxiliaries(): Promise<Auxiliary[]> {
        return await this.auxiliaryService.findAll();
    }

    @Query(() => Auxiliary)
    async auxiliary(@Args('code') code: number): Promise<Auxiliary> {
        return await this.auxiliaryService.findOne(code);
    }

}

