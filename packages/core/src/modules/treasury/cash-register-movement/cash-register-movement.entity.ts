import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Movement } from '../movement/movement.entity';
import { AccountMovement } from '../account-movement/account-movement.entity';
import { Installment } from 'src/modules/wallet/credit/installments/installment.entity';
import { Contribution } from 'src/modules/wallet/contribution/contribution.entity';
import { NoteMovement } from '../note-movement/note-movement.entity';

@ObjectType()
@Entity()
export class CashRegisterMovement {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Index()
  group_id: number;

  @Field(() => Movement)
  @ManyToOne(() => Movement, (movement) => movement.cash_movement, {
    cascade: ['insert'],
  })
  movement: Movement;

  @RelationId((it: CashRegisterMovement) => it.movement)
  @Column({ nullable: false })
  @Index()
  movementId: string;

  @Field(() => Installment)
  @OneToOne(() => Installment, (installment) => installment.movement_cash)
  @JoinColumn()
  installment_cash: Installment;

  @Field(() => Contribution)
  @OneToOne(() => Contribution, (contribution) => contribution.movement_cash)
  @JoinColumn()
  contribution_cash: Contribution;

  @Field(() => NoteMovement)
  @OneToOne(() => NoteMovement, (note_movement) => note_movement.movement_cash)
  @JoinColumn()
  note_cash: NoteMovement;

  @RelationId((it: CashRegisterMovement) => it.note_cash)
  noteCashId: number;

  @Field(() => [AccountMovement], { nullable: true })
  @OneToMany(
    () => AccountMovement,
    (account_movement) => account_movement.movement_cash,
    {
      cascade: ['insert', 'update', 'remove'],
    },
  )
  account_movement: AccountMovement[];
}
