import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCreditInput } from './create-credit.input';

@InputType()
export class UpdateCreditInput extends PartialType(CreateCreditInput) {
  @Field(() => Int)
  id: number;
}
