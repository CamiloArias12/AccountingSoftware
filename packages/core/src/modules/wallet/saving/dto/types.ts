import { Field, Int, InputType } from '@nestjs/graphql';
import { NatureEnum } from 'src/modules/parameterization/type-account/dto/enum-type';

@InputType()
export class SavingPayment {
  @Field(() => [Int])
  savings: number[];

  @Field()
  dateMovement: Date;

  @Field({ nullable: true })
  idAccount: number;

  @Field({ nullable: true })
  user: number;

  @Field({ nullable: true })
  company: number;

  @Field()
  concept: string;

  @Field({ nullable: true })
  nature: NatureEnum;

  @Field()
  datePayment: Date;
}
