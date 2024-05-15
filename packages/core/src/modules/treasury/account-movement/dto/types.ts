import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ViewCredit } from 'src/modules/wallet/credit/credit-view.entity';
import { Movement } from '../../movement/movement.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MovementAccount {
  value: number;
  nature: string;
  identification: number;
  lastName: string;
  code: number;
  nameAccount: string;
  name: string;
  numberIdentification: number;
  socialReason: string;
  date: Date;
  concept: string;
  idMovement: string;
  company: string;
  cash: number;
  deferred: number;
  disburment: number;
  note: number;
  credit: number;
}
@ObjectType()
export class BookAuxiliaryData {
  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  typeMovement?: string;

  @Field({ nullable: true })
  idMovement?: string;

  @Field({ nullable: true })
  concept?: string;

  @Field({ nullable: true })
  identificationThird?: number;

  @Field({ nullable: true })
  nameThird?: string;

  @Field({ nullable: true })
  code?: number;

  @Field({ nullable: true })
  nameAccount?: string;

  @Field({ nullable: true })
  previusBalance?: number;

  @Field({ nullable: true })
  debit?: number;

  @Field({ nullable: true })
  credit?: number;
  @Field({ nullable: true })
  total?: number;
}

@InputType()
export class CreditDisbursementInput {
  @Field(() => [ViewCredit])
  credits: ViewCredit[];

  @Field()
  idAccount: number;

  @Field()
  idThird: number;

  @Field()
  concept: string;
}

@ObjectType()
export class MovementAndAccount {
  @Field(() => [AccountTable])
  account: AccountTable[];

  @Field(() => Movement)
  movement: Movement;
}

@ObjectType()
export class AccountTable {
  @Field()
  credit: number;

  @Field()
  debit: number;

  @Field({ nullable: true })
  identificationThird: number;

  @Field({ nullable: true })
  nameThird: string;

  @Field({ nullable: true })
  code: number;

  @Field({ nullable: true })
  nameAccount: string;
}

@InputType()
export class BookAuxiliary {
  @ApiProperty({ type: () => Date })
  @Field()
  startDate: Date;

  @ApiProperty({ type: () => Date })
  @Field()
  endDate: Date;

  @ApiPropertyOptional({ type: () => Number })
  @Field({ nullable: true })
  user?: number;

  @ApiPropertyOptional({ type: () => Number })
  @Field({ nullable: true })
  company?: number;

  @ApiPropertyOptional({ type: () => Number })
  @Field({ nullable: true })
  idAccount?: number;
}
