import { InputType, Field } from '@nestjs/graphql';
import { ICredit } from './credit-interface';
import { CreateInstallment } from '../installments/dto/create-installment.input';

@InputType()
export class CreateCreditInput implements ICredit {
  @Field()
  creditValue: number;

  @Field()
  interest: number;

  @Field()
  startDate: Date;

  @Field({ nullable: true })
  valuePrevius: number;

  @Field()
  discountDate: Date;

  @Field()
  affiliateId: number;

  @Field()
  idTypeCredit: number;

  @Field(() => [CreateInstallment])
  installments: CreateInstallment[];

  @Field()
  concept: string;

  @Field()
  methodPayment: string;
}
