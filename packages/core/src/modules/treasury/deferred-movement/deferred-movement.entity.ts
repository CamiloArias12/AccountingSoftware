import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movement } from '../movement/movement.entity';
import { AccountMovement } from '../account-movement/account-movement.entity';
import { Installment } from 'src/modules/wallet/credit/installments/installment.entity';
import { Contribution } from 'src/modules/wallet/contribution/contribution.entity';

@ObjectType()
@Entity()
export class DeferredMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  group_id: number;

  @Field(() => Movement)
  @ManyToOne(() => Movement, (movement) => movement.deferred_movement, {
    cascade: ['insert'],
  })
  movement: Movement;

  @Field(() => Installment)
  @OneToOne(() => Installment, (installment) => installment.movement_deferred)
  @JoinColumn()
  installment_deferred: Installment;

  @Field(() => Contribution)
  @OneToOne(
    () => Contribution,
    (contribution) => contribution.movement_deferred,
  )
  @JoinColumn()
  contribution_deferred: Contribution;

  @Field(() => [AccountMovement], { nullable: true })
  @OneToMany(
    () => AccountMovement,
    (account_movement) => account_movement.movement_deffered,
    { nullable: false, cascade: ['insert', 'update'] },
  )
  account_movement: AccountMovement[];
}
