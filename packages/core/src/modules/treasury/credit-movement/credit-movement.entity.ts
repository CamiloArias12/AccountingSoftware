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
import { Movement } from '../movement/movement.entity';
import { Credit } from 'src/modules/wallet/credit/credit.entity';
import { CREDIT_MOVEMENT } from '../dto/enum-type';
import { AccountMovement } from '../account-movement/account-movement.entity';

@ObjectType()
@Entity()
export class CreditMovement {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Movement)
  @ManyToOne(() => Movement, (movement) => movement.credit_movement, {
    cascade: ['insert'],
  })
  movement: Movement;

  @Field(() => Credit)
  @OneToOne(() => Credit, (credit) => credit.credit_movement, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  credit: Credit;

  @Field(() => [AccountMovement], { nullable: true })
  @OneToMany(
    () => AccountMovement,
    (account_movement) => account_movement.movement_credit,
    {
      nullable: false,
      cascade: ['insert', 'update', 'remove'],
    },
  )
  account_movement: AccountMovement[];

  @Field({ defaultValue: 'Credit' })
  typeMovement: string;
}
