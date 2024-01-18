import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Regime, TypePerson } from './dto/enum-type';
import { TypeIdentification } from '../user/dto/enum-type';
import { AccountMovement } from 'src/modules/treasury/account-movement/account-movement.entity';
import { ICompany } from './dto/company-interface';

@ObjectType()
@Entity()
export class Company implements ICompany {
  @Field()
  @Column()
  typeIdentification: string;

  @Field()
  @PrimaryColumn()
  identification: number;

  @Field()
  @Column()
  digitVerification: number;

  @Field()
  @Column({
    type: 'enum',
    enum: Regime,
  })
  regime: Regime;

  @Field()
  @Column({
    type: 'enum',
    enum: TypePerson,
  })
  typePerson: TypePerson;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({
    type: 'enum',
    enum: TypeIdentification,
  })
  legalRepresentativeTypeIdentification: TypeIdentification;

  @Field()
  @Column()
  legalRepresentativeName: string;

  @Field()
  @Column('bigint')
  legalRepresentativeDocument: number;

  @Field()
  @Column()
  natureCompany: string;

  @Field(() => [AccountMovement])
  @OneToMany(
    () => AccountMovement,
    (account_movement) => account_movement.company,
  )
  account_movement: AccountMovement[];
}
