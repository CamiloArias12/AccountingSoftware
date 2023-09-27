import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateSavingInput } from './create-saving.input';

@InputType()
export class UpdateSavingInput extends PartialType(CreateSavingInput) {
  @Field(() => Int)
  id: number;
}

