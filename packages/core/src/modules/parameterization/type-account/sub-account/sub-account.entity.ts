import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Auxiliary } from '../auxiliary/auxiliary.entity';
import { Account } from '../account/account.entity';
import { TypeAccount } from '../type-account.entity';

@ObjectType()
@Entity()
export class SubAccount {
  @Field()
  @PrimaryColumn()
  code: number;

  @Field({ defaultValue: 'Subcuenta' })
  type: string;

  @ManyToOne(() => Account, (account) => account.subAccounts, {
    onUpdate: 'CASCADE',
  })
  account: Account;

  @Field(() => [Auxiliary], { name: 'accounts' })
  @OneToMany(() => Auxiliary, (auxiliary) => auxiliary.subAccount)
  auxiliaries: Auxiliary[];

  @Field(() => TypeAccount)
  @OneToOne(() => TypeAccount, (typeAccount) => typeAccount.subAccount, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'code' })
  typeAccount: TypeAccount;
}
