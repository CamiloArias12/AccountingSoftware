import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Saving } from '../saving/saving.entity';
import { CashRegisterMovement } from 'src/modules/treasury/cash-register-movement/cash-register-movement.entity';
import { DeferredMovement } from 'src/modules/treasury/deferred-movement/deferred-movement.entity';

@ObjectType()
@Entity()
export class Contribution {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  month: number;

  @Field()
  @Column()
  year: number;

  @Field(() => Saving)
  @ManyToOne(() => Saving, (saving) => saving.contributions)
  @JoinColumn()
  saving_contribution: Saving;

  @RelationId((it: Contribution) => it.saving_contribution)
  @Column({ nullable: false })
  @Index()
  savingContributionId: number;

  @Field(() => [CashRegisterMovement], { nullable: true })
  @OneToOne(
    () => CashRegisterMovement,
    (cashRegister_installment) => cashRegister_installment.contribution_cash,
    { cascade: ['insert', 'update', 'remove'] },
  )
  movement_cash: CashRegisterMovement;

  @RelationId((it: Contribution) => it.movement_cash)
  cash: number;

  @Field(() => [DeferredMovement], { nullable: true })
  @OneToOne(
    () => DeferredMovement,
    (deferred_installment) => deferred_installment.contribution_deferred,
    { cascade: ['insert', 'update', 'remove'] },
  )
  movement_deferred: DeferredMovement;
  @RelationId((it: Contribution) => it.movement_deferred)
  deferred: number;
}
