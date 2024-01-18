import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IInstallment } from './installment-interface';
import { StateInstallment } from './enum-types';

@InputType('InstallmentInput')
@ObjectType('InstallmentType')
export class CreateInstallment implements IInstallment {
  @Field()
  installmentNumber: number;

  @Field()
  paymentDate: Date;

  @Field()
  initialBalance: number;

  @Field()
  scheduledPayment: number;

  @Field()
  extraPayment: number;

  @Field()
  totalPayment: number;

  @Field()
  capital: number;

  @Field()
  interest: number;

  @Field()
  finalBalance: number;

  @Field({ nullable: true })
  state?: StateInstallment;
}
