import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SubAccount } from '../sub-account/sub-account.entity';
import { TypeAccount } from '../type-account.entity';
import { TypeCreditAccount } from '../../type-credit/type-credit-account/type-credit-account.entity';
import { AccountMovement } from 'src/modules/treasury/account-movement/account-movement.entity';
import { TypeSavingAccount } from '../../type-saving/type-saving-account/type-saving-account.entity';
@ObjectType()
@Entity()
export class Auxiliary {
  @Field()
  @PrimaryColumn()
  code: number;

  @Field({ defaultValue: 'Auxiliar' })
  type: string;

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.auxiliaries, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  subAccount: SubAccount;

  @Field(() => TypeAccount)
  @OneToOne(() => TypeAccount, (typeAccount) => typeAccount.auxiliary, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'code' })
  typeAccount: TypeAccount;

  @Field(() => [TypeCreditAccount])
  @OneToMany(() => TypeCreditAccount, (typeCredit) => typeCredit.account, {
    cascade: ['insert'],
  })
  typeCredit: TypeCreditAccount[];

  @Field(() => [TypeSavingAccount])
  @OneToMany(() => TypeSavingAccount, (typeSaving) => typeSaving.account, {
    cascade: ['insert'],
  })
  typeSaving: TypeSavingAccount[];

  @Field(() => [AccountMovement])
  @OneToMany(
    () => AccountMovement,
    (account_movement) => account_movement.auxiliary,
    { cascade: ['insert'] },
  )
  account_movement: AccountMovement[];
}
