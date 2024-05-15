import { CreateInstallment} from './create-installment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInstallmentInput extends PartialType(CreateInstallment) {
  @Field(() => Int)
  id: number;
}
