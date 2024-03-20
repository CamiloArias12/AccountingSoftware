import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseGraphql {
  @Field()
  state: boolean;

  @Field()
  message: string;
}
