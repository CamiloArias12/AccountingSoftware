import { Field, Int, InputType, createUnionType } from '@nestjs/graphql';
import { NatureEnum } from 'src/modules/parameterization/type-account/dto/enum-type';
import { ViewCredit } from 'src/modules/wallet/credit/credit-view.entity';
import { MovementOutput } from '../../deferred-movement/dto/types';

@InputType()
export class CreditDisbursementInput {
  @Field(() => [Int])
  credits: number[];

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

export const ResultDisbursement = createUnionType({
  name: 'DIsbursementUnion',
  types: () => [ViewCredit, MovementOutput] as const,
  resolveType(value) {
    if (value.name) {
      return ViewCredit;
    }
    if (value.concept) {
      return MovementOutput;
    }

    return null;
  },
});
