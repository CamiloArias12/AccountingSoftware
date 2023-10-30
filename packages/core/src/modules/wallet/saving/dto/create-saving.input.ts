import { InputType, Float, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateSavingInput {
  @Field(() => Float)
  qoutaValue: number;

  @Field()
  startDate: Date;

  @Field(() => Int)
  affiliateId: number;

  @Field(() => Int)
  typeSavingId: number;
}
