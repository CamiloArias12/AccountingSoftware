import { Resolver, Mutation, Args, Query, Int} from '@nestjs/graphql';
import { TypeSavingService } from './type-saving.service'; // Cambiado aquí
import { TypeSaving } from './type-saving.entity'; // Cambiado aquí
import { CreateTypeSavingDto } from './dto/createTypeSaving.dto';
import { UpdateTypeSavingInput } from './dto/updateTypeSaving.dto';

@Resolver(() => TypeSaving) // Cambiado aquí
export class TypeSavingResolver { // Cambiado aquí
    constructor(
        private readonly typeSavingService: TypeSavingService 
    ) { }

    @Mutation(() => TypeSaving) // Cambiado aquí
    async createTypeSaving(@Args('data') createTypeSavingDto: CreateTypeSavingDto): Promise<TypeSaving> { 
        return await this.typeSavingService.createTypeSaving(createTypeSavingDto); 
    }

    @Mutation(() => Boolean)
    async updateTypeSaving(@Args('data') updateTypeSavingDto: UpdateTypeSavingInput,
			   @Args('id') id:number
			  ): Promise<Boolean> {
        return await this.typeSavingService.update(updateTypeSavingDto,id);
    }
    @Query(() => [TypeSaving])
      async getTypeSavingAll(): Promise<TypeSaving[]> {
        return await this.typeSavingService.findAll();
    }

   @Mutation(()=>Boolean)
   async deleteTypeSaving(@Args('id', { type: () => Int }) id: number) {
      return this.typeSavingService.delete(id)
  }
}


