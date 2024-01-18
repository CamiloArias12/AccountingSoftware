import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IBeneficiary } from './dto/beneficiary-interface';
import { BeneficiaryAffiliate } from '../beneficiary-affiliate/beneficiary-affiliate.entity';

@ObjectType()
@Entity()
export class Beneficiary implements IBeneficiary {
  @Field()
  @PrimaryColumn('bigint')
  idDocument: number;

  @Field()
  @Column()
  name: string;

  @Field(() => BeneficiaryAffiliate)
  @OneToMany(
    () => BeneficiaryAffiliate,
    (beneficiaryAffiliate) => beneficiaryAffiliate.beneficiary,
    { onUpdate: 'CASCADE' },
  )
  beneficiaryAffiliate: BeneficiaryAffiliate[];
}
