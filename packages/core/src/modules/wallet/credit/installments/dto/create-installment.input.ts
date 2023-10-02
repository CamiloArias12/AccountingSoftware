import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateInstallmentInput {
  @Field()
  paymentDate: Date;

  @Field()
  initialBalance: number;

  @Field()
  scheduledPayment: number;

  @Field()
  extraPayment: number;

  @Field()
  totalPayment: number;

  @Field()
  capital: number;

  @Field()
  interest: number;

  @Field()
  finalBalance: number;

  @Field(() => Int)
  creditId: number;
}



