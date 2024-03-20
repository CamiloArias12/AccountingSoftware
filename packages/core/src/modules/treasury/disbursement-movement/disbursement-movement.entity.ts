import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Movement } from '../movement/movement.entity';
import { CREDIT_MOVEMENT } from '../dto/enum-type';
import { AccountMovement } from '../account-movement/account-movement.entity';
import { Installment } from 'src/modules/wallet/credit/installments/installment.entity';
import { Credit } from 'src/modules/wallet/credit/credit.entity';
import { NoteMovement } from '../note-movement/note-movement.entity';

@ObjectType()
@Entity()
export class DisbursementMovement {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  group_id: number;

  @Field(() => Movement)
  @ManyToOne(() => Movement, (movement) => movement.disbursement_movement, {
    cascade: ['insert'],
  })
  movement: Movement;

  @RelationId((it: DisbursementMovement) => it.movement)
  @Column({ nullable: false })
  @Index()
  movementId: string;

  @Field(() => Credit)
  @OneToOne(() => Credit, (credit) => credit.disbursement_movement)
  @JoinColumn()
  credit_disbursement: Credit;
  @RelationId((it: DisbursementMovement) => it.credit_disbursement)
  creditDisbursementId: number;

  @Field(() => NoteMovement)
  @OneToOne(
    () => NoteMovement,
    (note_movement) => note_movement.disbursement_movement,
  )
  @JoinColumn()
  note_disbursement: NoteMovement;

  @RelationId((it: DisbursementMovement) => it.note_disbursement)
  noteDisbursementId: number;

  @Field(() => [AccountMovement], { nullable: true })
  @OneToMany(
    () => AccountMovement,
    (account_movement) => account_movement.movement_disburment,
    {
      cascade: ['insert', 'update', 'remove'],
    },
  )
  account_movement: AccountMovement[];
}
