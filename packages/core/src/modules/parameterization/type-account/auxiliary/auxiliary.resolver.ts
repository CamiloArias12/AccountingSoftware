import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuxiliaryService } from './auxiliary.service';
import { Auxiliary } from './auxiliary.entity';

@Resolver(() => Auxiliary)
export class AuxiliaryResolver {
    constructor(private readonly auxiliaryService: AuxiliaryService) { }

   @Query(() => [Auxiliary])
    async getAuxilaryAll(): Promise<Auxiliary[]> {
        return await this.auxiliaryService.findAll();
    }

    @Query(() => Auxiliary)
    async getAuxiliary(@Args('code') code: number): Promise<Auxiliary> {
        return await this.auxiliaryService.findOne(code);
    }
  
    @Query(() => [Auxiliary])
    async getAccountBySubAccount(@Args('code') code:number): Promise<Auxiliary[]> {
        return await this.auxiliaryService.findBySubAccount(code);
    }


}

