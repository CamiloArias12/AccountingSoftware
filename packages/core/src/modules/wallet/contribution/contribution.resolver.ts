import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { UpdateContributionInput } from './dto/update-contribution.input';
import { Contribution } from './contribution.entity';
import { ContributionService } from './contribution.service';
import { ContributionSaving } from './dto/types';

@Resolver(() => Contribution)
export class ContributionResolver {
  constructor(private readonly contributionsService: ContributionService) {}

  @Query(() => [ContributionSaving])
  findContributionBySaving(
    @Args('saving', { type: () => Int }) saving: number,
  ) {
    return this.contributionsService.findBySaving(saving);
  }

  @Query(() => [[Float]])
  statisticsContributions() {
    return this.contributionsService.statistics();
  }

  @Query(() => Contribution, { name: 'contribution' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.contributionsService.findOne({ where: { id: id } });
  }

  @Mutation(() => Contribution)
  updateContribution(
    @Args('updateContributionInput')
    updateContributionInput: UpdateContributionInput,
  ) {
    return this.contributionsService.update(
      updateContributionInput.id,
      updateContributionInput,
    );
  }

  @Mutation(() => Contribution)
  removeContribution(@Args('id', { type: () => Int }) id: number) {
    return this.contributionsService.remove(id);
  }
}
