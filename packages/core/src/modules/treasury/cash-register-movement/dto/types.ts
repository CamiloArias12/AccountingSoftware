import {
  Field,
  Int,
  InputType,
  ObjectType,
  createUnionType,
} from '@nestjs/graphql';
import { NatureEnum } from 'src/modules/parameterization/type-account/dto/enum-type';
import {
  CreditPaymentOut,
  MovementOutput,
  SavingOut,
} from '../../deferred-movement/dto/types';

@InputType()
export class PaymentInstallmentInput {
  @Field(() => [MovementInstallment])
  installments: MovementInstallment[];

  @Field({ nullable: true })
  idAccount: number;

  @Field({ nullable: true })
  user: number;

  @Field({ nullable: true })
  company: number;

  @Field()
  concept: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  nature: NatureEnum;
}
@ObjectType()
export class CashPaymentCredit {
  @Field()
  identification: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  paymentDate: Date;

  @Field({ nullable: true })
  interest: number;

  @Field()
  installmentNumber: number;

  @Field()
  credit: number;

  @Field({ nullable: true })
  interestPayment: number;

  @Field()
  capital: number;

  @Field({ nullable: true })
  isDeferred: string;
}

@InputType()
export class MovementInstallment {
  @Field()
  credit: number;

  @Field(() => [Int])
  installments: number[];
}

export const ResultMovementCash = createUnionType({
  name: 'CashUnion',
  types: () => [SavingOut, CashPaymentCredit, MovementOutput] as const,
  resolveType(value) {
    if (value.credit) {
      return CashPaymentCredit;
    }
    if (value.saving) {
      return SavingOut;
    }
    if (value.date) {
      return MovementOutput;
    }

    return null;
  },
});
