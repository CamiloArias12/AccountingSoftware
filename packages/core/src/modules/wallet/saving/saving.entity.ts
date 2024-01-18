import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
} from 'typeorm';
import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { TypeSaving } from 'src/modules/parameterization/type-saving/type-saving.entity';
import { Contribution } from '../contribution/contribution.entity';

@ObjectType()
@Entity()
export class Saving {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Float)
  @Column('decimal', { precision: 12, scale: 2 })
  qoutaValue: number;

  @Field()
  @Column('date')
  startDate: Date;

  @Column({ default: true })
  state: boolean;

  @Field(() => Affiliate)
  @ManyToOne(() => Affiliate, (affiliate) => affiliate.savings, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  affiliate: Affiliate;

  @Field(() => TypeSaving)
  @ManyToOne(() => TypeSaving, { nullable: false })
  typeSaving: TypeSaving;

  @Field(() => [Contribution], { nullable: true })
  @OneToMany(
    () => Contribution,
    (contribution) => contribution.saving_contribution,
    {
      cascade: ['insert', 'update', 'remove'],
    },
  )
  contributions: Contribution[];
}
