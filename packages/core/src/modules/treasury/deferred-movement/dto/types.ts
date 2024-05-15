import { Field, InputType, ObjectType, createUnionType } from '@nestjs/graphql';

@ObjectType()
export class CreditPaymentOut {
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
}

@ObjectType()
export class SavingOut {
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  saving: number;
  @Field()
  qoutaValue: number;

  @Field()
  year: number;

  @Field()
  month: number;
}

@ObjectType()
export class MovementOutput {
  @Field()
  id: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  concept: string;

  @Field({ nullable: true })
  id_note: string;
}

export const ResultMovementDeferred = createUnionType({
  name: 'DeferredUnion',
  types: () => [SavingOut, CreditPaymentOut] as const,
  resolveType(value) {
    if (value.credit) {
      return CreditPaymentOut;
    }
    if (value.saving) {
      return SavingOut;
    }
    return null;
  },
});
