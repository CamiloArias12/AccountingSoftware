import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreateInstallment } from './create-installment.input';

@InputType()
export class ChangeAmortization {
  @Field(() => [CreateInstallment])
  tableAmortization: CreateInstallment[];
}

@InputType('InputTypeInstallmentPayment')
@ObjectType('InstallmentPayment')
export class InstallmentPayment {
  @Field()
  installmentNumber: number;

  @Field()
  credit: number;

  @Field()
  paymentDate: Date;

  @Field({ nullable: true })
  scheduledPayment: number;

  @Field()
  interest: number;

  @Field({ nullable: true })
  finalBalance: number;

  @Field()
  identification: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  typeCredit: string;

  @Field({ nullable: true })
  extraPayment: number;

  @Field({ nullable: true })
  totalPayment: number;

  @Field({ nullable: true })
  capital: number;

  @Field({ nullable: true })
  interestPayment: number;

  @Field({ nullable: true })
  idTypeCredit: number;
}
