import {
  Field,
  Int,
  InputType,
  ObjectType,
  createUnionType,
} from '@nestjs/graphql';
import { NatureEnum } from 'src/modules/parameterization/type-account/dto/enum-type';
export enum EnumTypeNote {
  CASH = 'RECIBO DE CAJA',
  DISBURSEMENT = 'COMPROBANTE DE EGRESO',
  OTHER = 'OTRO',
}

@InputType()
export class NoteMovementInput {
  @Field(() => [AccountMovementInput])
  accounts: AccountMovementInput[];

  @Field()
  date: Date;

  @Field()
  concept: string;

  @Field()
  type: EnumTypeNote;
}

@InputType()
export class AccountMovementInput {
  @Field()
  account: number;

  @Field({ nullable: true })
  user: number;

  @Field({ nullable: true })
  company: number;

  @Field()
  nature: NatureEnum;

  @Field()
  value: number;
}

@ObjectType()
export class NoteMovementPayment {


  @Field()
  id: string;

 @Field()
  noteId: number;

  @Field()
  date: Date;

  @Field()
  concept: string;

}



@InputType()
export class NotePayment {
  @Field(() => [Int])
  notes: number[];

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
}
