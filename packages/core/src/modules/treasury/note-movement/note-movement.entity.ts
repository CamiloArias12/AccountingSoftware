import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Movement } from '../movement/movement.entity';
import { AccountMovement } from '../account-movement/account-movement.entity';
import { EnumTypeNote } from './dto/types';
import { CashRegisterMovement } from '../cash-register-movement/cash-register-movement.entity';
import { DisbursementMovement } from '../disbursement-movement/disbursement-movement.entity';

@ObjectType()
@Entity()
export class NoteMovement {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Index()
  group_id: number;

  @Field()
  @Column({
    type: 'enum',
    enum: EnumTypeNote,
    default: EnumTypeNote.OTHER,
  })
  type: EnumTypeNote;

  @Field(() => Movement)
  @ManyToOne(() => Movement, (movement) => movement.note_movemnt, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  movement: Movement;

  @RelationId((it: NoteMovement) => it.movement)
  @Column({ nullable: false })
  @Index()
  movementId: string;

  @OneToOne(
    () => CashRegisterMovement,
    (cashRegister_installment) => cashRegister_installment.note_cash,
    { cascade: ['update', 'remove'] },
  )
  movement_cash: CashRegisterMovement;

  @Field(() => [DisbursementMovement])
  @OneToOne(
    () => DisbursementMovement,
    (movement_credit) => movement_credit.note_disbursement,
  )
  disbursement_movement: DisbursementMovement;

  @Field(() => [AccountMovement])
  @OneToMany(
    () => AccountMovement,
    (account_movement) => account_movement.movement_note,
    {
      cascade: ['insert', 'update', 'remove'],
    },
  )
  account_movement: AccountMovement[];
}
