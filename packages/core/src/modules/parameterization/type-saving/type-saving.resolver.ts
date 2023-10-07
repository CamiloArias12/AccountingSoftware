import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TypeSavingService } from './type-saving.service'; // Cambiado aquí
import { TypeSaving } from './type-saving.entity'; // Cambiado aquí
import { CreateTypeSavingDto } from './dto/createTypeSaving.dto';
import { UpdateTypeSavingDto } from './dto/updateTypeSaving.dto';

@Resolver(() => TypeSaving) // Cambiado aquí
export class TypeSavingResolver { // Cambiado aquí
    constructor(
        private readonly typeSavingService: TypeSavingService 
    ) { }

    @Mutation(() => TypeSaving) // Cambiado aquí
    async createTypeSaving(@Args('data') createTypeSavingDto: CreateTypeSavingDto): Promise<TypeSaving> { 
        return await this.typeSavingService.createTypeSaving(createTypeSavingDto); 
    }

    @Mutation(() => TypeSaving)
    async updateTypeSaving(@Args('data') updateTypeSavingDto: UpdateTypeSavingDto): Promise<TypeSaving> {
        return await this.typeSavingService.updateOrCreateTypeSaving(updateTypeSavingDto);
    }
    @Query(() => [TypeSaving])
      async getTypeSavingAll(): Promise<TypeSaving[]> {
        return await this.typeSavingService.findAll();
    }

}


