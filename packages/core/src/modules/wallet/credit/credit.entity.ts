import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Credit {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
