import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditStatistics {
  @Field()
  total: number;

  @Field()
  total_value: number;

  @Field()
  total_approved: number;

  @Field()
  total_progress: number;

  @Field()
  total_refinanced: number;

  @Field()
  total_finalized: number;

  @Field()
  total_dibursed: number;
}

@ObjectType()
export class CreditStatisticsGeneral {
  @Field()
  value: number;

  @Field()
  date: number;
}
