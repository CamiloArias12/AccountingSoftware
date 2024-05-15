import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field()
  name: string;

  @Field()
  third: boolean;

  @Field()
  saving: boolean;
  @Field()
  credit: boolean;

  @Field()
  type_account: boolean;

  @Field()
  type_saving: boolean;
  @Field()
  type_credit: boolean;

  @Field()
  movement: boolean;

  @Field()
  deferred: boolean;

  @Field()
  cash: boolean;

  @Field()
  roles: boolean;

  @Field()
  note: boolean;

  @Field()
  book_auxiliary: boolean;

  @Field()
  disbursementvoucher: boolean;
}
