import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Installment } from './installments/installment.entity';

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

  @Field(() => [Installment])
  @OneToMany(() => Installment, (installment) => installment.credit)
  installments: Installment[];
}



