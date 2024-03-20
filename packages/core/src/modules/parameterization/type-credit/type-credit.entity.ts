import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Credit } from 'src/modules/wallet/credit/credit.entity';
import { TypeCreditAccount } from './type-credit-account/type-credit-account.entity';
@ObjectType()
@Entity()
export class TypeCredit {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 120 })
  name: string;

  @Field()
  @Column({ type: 'double' })
  interest: number;

  @Field(() => [Credit])
  @OneToMany(() => Credit, (credit) => credit.typeCredit)
  credits: Credit[];

  @Field(() => [TypeCreditAccount])
  @OneToMany(
    () => TypeCreditAccount,
    (typeCreditAccount) => typeCreditAccount.typeCredit,
    { nullable: false, cascade: ['insert'] },
  )
  auxiliaries: TypeCreditAccount[];
}
