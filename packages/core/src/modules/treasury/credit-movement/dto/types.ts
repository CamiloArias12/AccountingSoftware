import { Field, InputType } from '@nestjs/graphql';
import { NatureEnum } from 'src/modules/parameterization/type-account/dto/enum-type';
import { ViewCredit } from 'src/modules/wallet/credit/credit-view.entity';

@InputType()
export class CreditDisbursementInput {
  @Field(() => [ViewCredit])
  credits: ViewCredit[];

  @Field()
  idAccount: number;

  @Field({ nullable: true })
  user: number;

  @Field({ nullable: true })
  company: number;

  @Field()
  concept: string;

  @Field()
  date: Date;

  @Field()
  nature: NatureEnum;
}
