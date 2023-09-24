import { InputType, Float, Field } from '@nestjs/graphql';

@InputType()
export class CreateCreditInput {
  @Field(() => Float)
  loanAmount: number;

  @Field(() => Float)
  annualInterest: number;

  @Field(() => Float)
  loanPeriod: number;

  @Field()
  startDate: Date;
}


