import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Installment } from './installments/installment.entity';
import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { TypeCredit } from 'src/modules/parameterization/type-credit/type-credit.entity';

@ObjectType()
@Entity()
export class Credit {
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

  @Field(() => Int)
   @Column()
   typeCreditId: number;

  @ManyToOne(() => Affiliate, affiliate => affiliate.credits)
  @JoinColumn({ name: 'affiliateId' })
  affiliate: Affiliate;

  @Field(() => [Installment])
  @OneToMany(() => Installment, (installment) => installment.credit)
  installments: Installment[];

   @ManyToOne(() => TypeCredit, typeCredit => typeCredit.credits)
   @JoinColumn({ name: 'typeCreditId' })
   typeCredit: TypeCredit;
}



