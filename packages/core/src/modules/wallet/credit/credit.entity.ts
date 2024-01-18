import { ObjectType, Field, Float, Int, DateScalarMode } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
  Index,
  OneToOne,
} from 'typeorm';
import { Installment } from './installments/installment.entity';
import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { TypeCredit } from 'src/modules/parameterization/type-credit/type-credit.entity';
import { ICredit } from './dto/credit-interface';
import { PaymentMethods, StateCredit } from './dto/enum-types';
import { CreditMovement } from 'src/modules/treasury/credit-movement/credit-movement.entity';
import { DisbursementMovement } from 'src/modules/treasury/disbursement-movement/disbursement-movement.entity';

@ObjectType()
@Entity()
export class Credit implements ICredit {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('double', { nullable: false })
  creditValue: number;

  @Field()
  @Column('double', { nullable: false, default: 0 })
  valuePrevius: number;

  @Field()
  @Column('double', { nullable: false })
  interest: number;

  @Field()
  @Column('date')
  startDate: Date;

  @Field()
  @Column('date', { nullable: false })
  discountDate: Date;

  @Field()
  @Column({
    type: 'enum',
    enum: StateCredit,
    nullable: false,
    default: StateCredit.APROBADO,
  })
  state: string;

  @Field()
  @Column({
    type: 'enum',
    enum: PaymentMethods,
    nullable: false,
    default: PaymentMethods.monthly,
  })
  methodPayment: string;

  @Field(() => Affiliate)
  @ManyToOne(() => Affiliate, (affiliate) => affiliate.credits, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  affiliate: Affiliate;

  @RelationId((it: Credit) => it.affiliate)
  @Column({ nullable: false })
  @Index()
  affiliateId: number;

  @Field(() => [Installment])
  @OneToMany(() => Installment, (installment) => installment.credit, {
    nullable: false,
    cascade: ['insert', 'update', 'remove'],
    onUpdate: 'CASCADE',
  })
  installments: Installment[];

  @Field(() => [CreditMovement], { nullable: true })
  @OneToOne(() => CreditMovement, (movement_credit) => movement_credit.credit, {
    cascade: ['insert', 'update'],
  })
  credit_movement: CreditMovement;

  @Field(() => [DisbursementMovement], { nullable: true })
  @OneToOne(
    () => DisbursementMovement,
    (movement_credit) => movement_credit.credit_disbursement,
  )
  disbursement_movement: CreditMovement;

  @Field(() => Credit)
  @OneToOne(() => Credit, (credit) => credit.credit_refinance)
  @JoinColumn()
  credit_refinance: Credit;

  @Field(() => TypeCredit)
  @ManyToOne(() => TypeCredit, (typeCredit) => typeCredit.credits, {
    nullable: false,
  })
  typeCredit: TypeCredit;

  constructor(params?: ICredit) {
    Object.assign(this, params);
  }
}
