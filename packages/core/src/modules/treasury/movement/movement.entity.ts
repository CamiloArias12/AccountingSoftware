import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accounting } from '../dto/enum-type';
import { CreditMovement } from '../credit-movement/credit-movement.entity';
import { DeferredMovement } from '../deferred-movement/deferred-movement.entity';
import { CashRegisterMovement } from '../cash-register-movement/cash-register-movement.entity';
import { DisbursementMovement } from '../disbursement-movement/disbursement-movement.entity';
import { NoteMovement } from '../note-movement/note-movement.entity';

@ObjectType()
@Entity()
export class Movement {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field(() => Date)
  @Column('date')
  date: Date;

  @Field()
  @Column()
  concept: string;

  @Field()
  @Column({
    type: 'enum',
    enum: Accounting,
    default: Accounting.SETTLED,
    nullable: false,
  })
  accounting: Accounting;

  @Field()
  @Column({ default: true })
  state: boolean;

  @Field(() => CreditMovement, { nullable: true })
  @OneToOne(() => CreditMovement, (creditMovement) => creditMovement.movement)
  credit_movement: CreditMovement;

  @Field(() => CashRegisterMovement, { nullable: true })
  @OneToMany(
    () => CashRegisterMovement,
    (cashMovement) => cashMovement.movement,
  )
  cash_movement: CashRegisterMovement[];

  @OneToMany(
    () => DeferredMovement,
    (deferredMovement) => deferredMovement.movement,
  )
  deferred_movement: DeferredMovement[];

  @OneToMany(
    () => DisbursementMovement,
    (disbursementMovement) => disbursementMovement.movement,
  )
  disbursement_movement: DisbursementMovement[];

  @Field(() => NoteMovement, { nullable: true })
  @OneToMany(() => NoteMovement, (note_movemnt) => note_movemnt.movement)
  note_movemnt: NoteMovement[];
}
