import { InputType, Float, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateSavingInput {
  @Field(() => Float)
  loanAmount: number;

  @Field(() => Float)
  annualInterest: number;

  @Field(() => Float)
  loanPeriod: number;

  @Field()
  startDate: Date;

  @Field()
  affiliateId: number;

  @Field(() => Int)
   typeSavingId: number;
}
