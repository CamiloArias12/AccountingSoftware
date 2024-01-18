import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCreditInput } from './create-credit.input';
import { CreateInstallment } from '../installments/dto/create-installment.input';

@InputType()
export class UpdateCreditInput {
  @Field(() => Int)
  idCredit: number;

  @Field(() => [CreateInstallment])
  installments: CreateInstallment[];
}
