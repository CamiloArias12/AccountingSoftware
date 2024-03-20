import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { IAfiliate } from './dto/afiliate.interface';
import { User } from '../user/user.entity';
import { BeneficiaryAffiliate } from './beneficiary-affiliate/beneficiary-affiliate.entity';
import { Credit } from 'src/modules/wallet/credit/credit.entity';
import { Saving } from 'src/modules/wallet/saving/saving.entity';

@ObjectType()
@Entity()
export class Affiliate implements IAfiliate {
  @PrimaryColumn('bigint')
  identification: number;

  @Field()
  @Column({ length: 60 })
  company: string;

  @Field()
  @Column({ length: 120 })
  addreesCompany: string;

  @Field()
  @Column({ length: 60 })
  emailJob: string;

  @Field()
  @Column()
  salary: number;

  @Field()
  @Column({ length: 80 })
  bank: string;

  @Field()
  @Column({ length: 40 })
  jobTitle: string;

  @Field()
  @Column({ length: 30 })
  phone: string;

  @Field()
  @Column('date')
  incomeCompany: Date;

  @Field()
  @Column({ length: 40 })
  typeAccount: string;

  @Field()
  @Column('bigint')
  numberAccount: number;

  @Field()
  @Column({ default: true })
  state: boolean;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.affiliate, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'identification' })
  user: User;

  @Field(() => [BeneficiaryAffiliate])
  @OneToMany(
    () => BeneficiaryAffiliate,
    (beneficiaryAffiliate) => beneficiaryAffiliate.affiliate,
    {
      cascade: ['insert', 'remove', 'update'],
    },
  )
  beneficiaries: BeneficiaryAffiliate[];

  @Field(() => [Credit])
  @OneToMany(() => Credit, (credit) => credit.affiliate, {
    cascade: true,
    eager: true,
  })
  credits: Credit[];

  @Field(() => [Saving])
  @OneToMany(() => Saving, (saving) => saving.affiliate)
  savings: Saving[];

  constructor(params?: IAfiliate) {
    Object.assign(this, params);
  }
}
