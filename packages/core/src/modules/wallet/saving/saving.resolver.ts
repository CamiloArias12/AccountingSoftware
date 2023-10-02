import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SavingService } from './saving.service';
import { CreateSavingInput } from './dto/create-saving.input';
import { UpdateSavingInput } from './dto/update-saving.input';
import { Saving } from './saving.entity';

@Resolver(() => Saving)
export class SavingResolver {
  constructor(private readonly savingService: SavingService) { }

  @Mutation(() => Saving)
  createSaving(@Args('createSavingInput') createSavingInput: CreateSavingInput) {
    return this.savingService.create(createSavingInput);
  }

  @Query(() => [Saving], { name: 'saving' })
  findAll() {
    return this.savingService.findAll();
  }

  @Query(() => Saving, { name: 'saving' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.savingService.findOne(id);
  }

  @Mutation(() => Saving)
  async updateSaving(
    @Args('updateSavingInput') updateSavingInput: UpdateSavingInput
  ): Promise<Saving> {
    return this.savingService.update(updateSavingInput.id, updateSavingInput);
  }

  @Mutation(() => Saving)
  removeSaving(@Args('id', { type: () => Int }) id: number) {
    return this.savingService.remove(id);
  }
}

