import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class MovementInstallment {
  @Field()
  credit: number;

  @Field(() => [])
  installment: number[];
}
