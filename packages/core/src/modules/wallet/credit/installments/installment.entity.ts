import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { IInstallment } from './dto/installment-interface';
import { Credit } from '../credit.entity';
import { StateInstallment } from './dto/enum-types';
import { DeferredMovement } from 'src/modules/treasury/deferred-movement/deferred-movement.entity';
import { CashRegisterMovement } from 'src/modules/treasury/cash-register-movement/cash-register-movement.entity';
import { DisbursementMovement } from 'src/modules/treasury/disbursement-movement/disbursement-movement.entity';

@ObjectType()
@Entity()
export class Installment implements IInstallment {
  @Field()
  @PrimaryColumn()
  installmentNumber: number;

  @Field()
  @PrimaryColumn()
  id_credit: number;

  @Field(() => Date)
  @Column('date')
  paymentDate: Date;

  @Field()
  @Column()
  initialBalance: number;

  @Field()
  @Column()
  scheduledPayment: number;

  @Field()
  @Column()
  extraPayment: number;

  @Field()
  @Column()
  totalPayment: number;

  @Field()
  @Column()
  capital: number;

  @Field()
  @Column()
  interest: number;

  @Field()
  @Column()
  finalBalance: number;

  @Field()
  @Column({
    type: 'enum',
    enum: StateInstallment,
    nullable: false,
    default: StateInstallment.PENDIENTE,
  })
  state: StateInstallment;

  @Field(() => Credit)
  @ManyToOne(() => Credit, (credit) => credit.installments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_credit' })
  credit: Credit;

  @Field(() => [CashRegisterMovement], { nullable: true })
  @OneToOne(
    () => CashRegisterMovement,
    (cashRegister_installment) => cashRegister_installment.installment_cash,
    { cascade: ['insert', 'update', 'remove'] },
  )
  movement_cash: CashRegisterMovement;

  @Field(() => [DeferredMovement], { nullable: true })
  @OneToOne(
    () => DeferredMovement,
    (deferred_installment) => deferred_installment.installment_deferred,
    { cascade: ['insert', 'update', 'remove'] },
  )
  movement_deferred: DeferredMovement;
}
