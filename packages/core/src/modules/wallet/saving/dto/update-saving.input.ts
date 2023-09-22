import { CreateSavingInput } from './create-saving.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSavingInput extends PartialType(CreateSavingInput) {
  @Field(() => Int)
  id: number;
}
