import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { TypeSaving } from 'src/modules/parameterization/type-saving/type-saving.entity';

@ObjectType()
@Entity()
export class Saving {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Float)
  @Column('decimal', { precision: 12, scale: 2 })
  loanAmount: number;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 2 })
  annualInterest: number;

  @Field(() => Float)
  @Column('decimal', { precision: 4, scale: 2 })
  loanPeriod: number;

  @Field()
  @Column('date')
  startDate: Date;

  @Field(() => Int)
  @Column()
  affiliateId: number;

  @Field()
  @Column()
  typeSavingId: number;

  @ManyToOne(() => Affiliate, affiliate => affiliate.savings)
  @JoinColumn({ name: 'affiliateId' })
  affiliate: Affiliate;

  @ManyToOne(() => TypeSaving)
  @JoinColumn({ name: 'typeSavingId' })
  typeSaving: TypeSaving;

}

