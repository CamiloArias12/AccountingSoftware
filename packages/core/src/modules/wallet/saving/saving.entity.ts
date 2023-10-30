import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToOne} from 'typeorm';
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
  qoutaValue: number;

  @Field()
  @Column()
  startDate: Date;


  @Field(() => Affiliate)
  @ManyToOne(() => Affiliate, affiliate => affiliate.savings,{nullable:false})
  affiliate: Affiliate;

  @Field(() => TypeSaving)
  @ManyToOne(() => TypeSaving,{nullable:false})
  typeSaving: TypeSaving;

}

