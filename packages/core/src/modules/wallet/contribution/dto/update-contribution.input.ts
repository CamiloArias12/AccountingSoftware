import { CreateContributionInput } from './create-contribution.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContributionInput extends PartialType(CreateContributionInput) {
  @Field(() => Int)
  id: number;
}
