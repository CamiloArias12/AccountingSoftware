import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { SavingService } from './saving.service';
import { CreateSavingInput } from './dto/create-saving.input';
import { UpdateSavingInput } from './dto/update-saving.input';
import { Saving } from './saving.entity';
import { ViewSaving } from './saving-view.entity';

@Resolver(() => Saving)
export class SavingResolver {
  constructor(private readonly savingService: SavingService) {}

  @Mutation(() => Boolean)
  createSaving(
    @Args('createSavingInput') createSavingInput: CreateSavingInput,
  ): Promise<Boolean> {
    return this.savingService.create(createSavingInput);
  }

  @Query(() => [ViewSaving])
  async getAllSaving() {
    console.log(await this.savingService.findAll());
    return this.savingService.findAll();
  }

  @Query(() => ViewSaving)
  async getSaving(@Args('id', { type: () => Int }) id: number) {
    return this.savingService.findOne(id);
  }

  @Query(() => Float)
  async countSavingByAffiliate(@Args('id', { type: () => Float }) id: number) {
    return this.savingService.countAllByAffiliate(id);
  }

  @Query(() => Float)
  async totalSavings() {
    return this.savingService.count();
  }

  @Mutation(() => Boolean)
  async updateSaving(
    @Args('updateSavingInput') updateSavingInput: UpdateSavingInput,
  ): Promise<Boolean> {
    return this.savingService.update(updateSavingInput);
  }

  @Mutation(() => Saving)
  async removeSaving(@Args('id', { type: () => Int }) id: number) {
    return this.savingService.remove(id);
  }
}
