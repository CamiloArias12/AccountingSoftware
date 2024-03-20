import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Auxiliary } from '../../type-account/auxiliary/auxiliary.entity';
import { NatureEnum } from '../../type-account/dto/enum-type';
import { TypeSaving } from '../type-saving.entity';

@ObjectType()
@Entity()
export class TypeSavingAccount {
  @PrimaryColumn()
  idTypeSaving: number;

  @Field()
  @PrimaryColumn()
  idAccount: number;

  @Field()
  @Column({
    type: 'enum',
    enum: NatureEnum,
    nullable: false,
  })
  nature: NatureEnum;

  @Field()
  @Column('decimal')
  percentage: number;

  @Field(() => Auxiliary)
  @ManyToOne(() => Auxiliary, (auxiliary) => auxiliary.typeSaving)
  @JoinColumn({ name: 'idAccount' })
  account: Auxiliary;

  @Field(() => TypeSaving)
  @JoinColumn({ name: 'idTypeSaving' })
  @ManyToOne(() => TypeSaving, (typeSaving) => typeSaving.auxiliaries, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  typeSaving: TypeSaving;
}
