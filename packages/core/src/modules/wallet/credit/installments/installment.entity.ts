import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Installment {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
