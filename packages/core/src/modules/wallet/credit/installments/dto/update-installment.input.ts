import { CreateInstallmentInput } from './create-installment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInstallmentInput extends PartialType(CreateInstallmentInput) {
  @Field(() => Int)
  id: number;
}
