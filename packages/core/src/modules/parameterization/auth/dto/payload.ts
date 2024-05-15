import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '../../thirds/role/role.entity';

export type payload = {
  id: number;
  name: string;
};

@ObjectType()
export class Token {
  @Field()
  token: string;

  @Field()
  name: string;

  @Field()
  lastName: string;
  @Field()
  email: string;

  @Field(() => [Role])
  roles: Role[];
}
