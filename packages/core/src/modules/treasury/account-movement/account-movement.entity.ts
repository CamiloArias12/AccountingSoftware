import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Auxiliary } from 'src/modules/parameterization/type-account/auxiliary/auxiliary.entity';
import { Company } from 'src/modules/parameterization/thirds/company/company.entity';
import { NatureEnum } from 'src/modules/parameterization/type-account/dto/enum-type';
import { CreditMovement } from '../credit-movement/credit-movement.entity';
import { User } from 'src/modules/parameterization/thirds/user/user.entity';
import { DeferredMovement } from '../deferred-movement/deferred-movement.entity';
import { DisbursementMovement } from '../disbursement-movement/disbursement-movement.entity';
import { CashRegisterMovement } from '../cash-register-movement/cash-register-movement.entity';
import { NoteMovement } from '../note-movement/note-movement.entity';

@ObjectType()
@Entity()
export class AccountMovement {
  @PrimaryGeneratedColumn()
  id_movement: number;

  @Field()
  @Column({
    type: 'enum',
    enum: NatureEnum,
    nullable: false,
  })
  nature: NatureEnum;

  @ManyToOne(() => User, (user) => user.account_movement, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Field({ nullable: true, name: 'user' })
  @RelationId((it: AccountMovement) => it.user)
  @Column('bigint', { nullable: true })
  userIdentification?: number;

  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.account_movement)
  company: Company;

  @Field({ nullable: true, name: 'company' })
  @RelationId((it: AccountMovement) => it.company)
  @Column('bigint', { nullable: true })
  companyIdentification?: number;

  @Field(() => Auxiliary)
  @ManyToOne(() => Auxiliary, (auxiliary) => auxiliary.account_movement)
  @JoinColumn()
  auxiliary: Auxiliary;

  @Field({ nullable: true, name: 'account' })
  @RelationId((it: AccountMovement) => it.auxiliary)
  @Column()
  auxiliaryCode?: number;

  @Field()
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  value: number;

  @ManyToOne(
    () => DisbursementMovement,
    (movement) => movement.account_movement,
    { onDelete: 'CASCADE' },
  )
  movement_disburment: DisbursementMovement;

  @ManyToOne(
    () => CashRegisterMovement,
    (movement) => movement.account_movement,
    {
      onDelete: 'CASCADE',
    },
  )
  movement_cash: CashRegisterMovement;

  @Field(() => NoteMovement)
  @ManyToOne(() => NoteMovement, (movement) => movement.account_movement, {
    onDelete: 'CASCADE',
  })
  movement_note: NoteMovement;

  @Field(() => CreditMovement)
  @ManyToOne(() => CreditMovement, (movement) => movement.account_movement, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
  })
  movement_credit: CreditMovement;

  @Field(() => DeferredMovement)
  @ManyToOne(() => DeferredMovement, (movement) => movement.account_movement, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
  })
  movement_deffered: DeferredMovement;
}
