import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SavingService } from './saving.service';
import { CreateSavingInput } from './dto/create-saving.input';
import { UpdateSavingInput } from './dto/update-saving.input';
import { Saving } from './saving.entity';
import { ViewSaving } from './saving-view.entity';

@Resolver(() => Saving)
export class SavingResolver {
  constructor(private readonly savingService: SavingService) { }

  @Mutation(() => Boolean)
  createSaving(@Args('createSavingInput') createSavingInput: CreateSavingInput):Promise<Boolean> {
    return this.savingService.create(createSavingInput);
  }

  @Query(() => [ViewSaving])
  async getAllSaving() {
     console.log(await this.savingService.findAll())
    return this.savingService.findAll();
  }

  @Query(() => Saving)
  async getSaving(@Args('id', { type: () => Int }) id: number) {
    return this.savingService.findOne(id);
  }

  @Mutation(() => Saving)
  async updateSaving(
    @Args('updateSavingInput') updateSavingInput: UpdateSavingInput
  ): Promise<Saving> {
    return this.savingService.update(updateSavingInput.id, updateSavingInput);
  }

  @Mutation(() => Saving)
  async removeSaving(@Args('id', { type: () => Int }) id: number) {
    return this.savingService.remove(id);
  }
}

