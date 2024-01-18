import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Beneficiary } from '../beneficiary/beneficiary.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Affiliate } from '../affiliate.entity';
import { IBeneficiaryAffiliate } from './dto/beneficiary-affiliate.interface';

@ObjectType()
@Entity()
export class BeneficiaryAffiliate implements IBeneficiaryAffiliate {
  @PrimaryColumn('bigint')
  idAffiliate: number;

  @PrimaryColumn('bigint')
  idBeneficiary: number;

  @Field()
  @Column()
  percentage: number;

  @Field(() => Beneficiary)
  @ManyToOne(
    () => Beneficiary,
    (beneficiary) => beneficiary.beneficiaryAffiliate,
    {
      cascade: ['update'],
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'idBeneficiary' })
  beneficiary: Beneficiary;

  @Field(() => Affiliate)
  @ManyToOne(() => Affiliate, (affiliate) => affiliate.beneficiaries, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'idAffiliate' })
  affiliate: Affiliate;
  constructor(params?: IBeneficiaryAffiliate) {
    Object.assign(this, params);
  }
}
