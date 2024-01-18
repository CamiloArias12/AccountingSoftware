import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { NatureEnum, TypeAccountEnum } from './enum-type';
import { ITypeAccount } from './type-account-interface';

export class AccountType implements ITypeAccount {
  code: number;
  name: string;
  nature: string;
}

export type AccountTypeGeneral = {
  type: string;
  typeAccount: AccountType;
};

@InputType()
export class TypeSavingCreditAccount {
  @Field()
  account: number;

  @Field()
  nature: NatureEnum;
}

@ObjectType()
export class ClassAccountStatistics {
  @Field()
  code: number;

  @Field()
  name: string;

  @Field()
  credit_balance: number;

  @Field()
  debit_balance: number;
}
