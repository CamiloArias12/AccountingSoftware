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
import { TypeCredit } from '../type-credit.entity';
import { NatureEnum } from '../../type-account/dto/enum-type';
import { TypeAccountCreditEnum } from '../dto/enum-types';

@ObjectType()
@Entity()
export class TypeCreditAccount {
  @PrimaryColumn()
  idTypeCredit: number;

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
  @PrimaryColumn({
    type: 'enum',
    enum: TypeAccountCreditEnum,
    nullable: false,
  })
  typeAccount: TypeAccountCreditEnum;

  @Field(() => Auxiliary)
  @ManyToOne(() => Auxiliary, (auxiliary) => auxiliary.typeCredit)
  @JoinColumn({ name: 'idAccount' })
  account: Auxiliary;

  @Field(() => TypeCredit)
  @JoinColumn({ name: 'idTypeCredit' })
  @ManyToOne(() => TypeCredit, (typeCredit) => typeCredit.auxiliaries, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  typeCredit: TypeCredit;
}
