import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateSavingInput } from './create-saving.input';

@InputType()
export class UpdateSavingInput {
  @Field(() => Int)
  id: number;
  @Field()
  qoutaValue: number;
}
