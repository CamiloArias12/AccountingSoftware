import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContributionSaving {
  @Field()
  value: number;

  @Field()
  date: string;
}

@ObjectType()
export class ContributionSavingStatistics {
  @Field()
  value: number;

  @Field()
  date: number;
}
