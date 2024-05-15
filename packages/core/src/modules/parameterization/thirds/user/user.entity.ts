import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { IUser } from './dto/user.interface';
import {
  CivilStatus,
  Gender,
  HousingType,
  Studies,
  TypeIdentification,
} from './dto/enum-type';
import { Affiliate } from '../affiliate/affiliate.entity';
import { Employee } from '../employee/employee.entity';
import { Provider } from '../provider/provider.entity';
import { AccountMovement } from 'src/modules/treasury/account-movement/account-movement.entity';

@ObjectType()
@Entity()
export class User implements IUser {
  @Field()
  @Column({
    type: 'enum',
    enum: TypeIdentification,
    nullable: false,
  })
  typeIdentification: TypeIdentification;

  @Field()
  @PrimaryColumn('bigint')
  identification: number;

  @Field()
  @Column({ length: 50 })
  name: string;

  @Field()
  @Column({ length: 50 })
  lastName: string;

  @Field()
  @Column('date')
  expeditionDate: Date;

  @Field()
  @Column({ length: 40 })
  expeditionCity: string;

  @Field()
  @Column('date')
  birthDate: Date;

  @Field()
  @Column({ length: 30 })
  countryBirth: string;

  @Field()
  @Column({ length: 30 })
  stateBirth: string;

  @Field()
  @Column({ length: 30 })
  cityBirth: string;

  @Field()
  @Column({
    type: 'enum',
    enum: Gender,
    nullable: false,
  })
  gender: Gender;

  @Field()
  @Column({
    type: 'enum',
    enum: CivilStatus,
    nullable: false,
  })
  statusCivil: CivilStatus;

  @Field()
  @Column({ length: 60 })
  addressResidence: string;

  @Field()
  @Column({ length: 30 })
  countryResidence: string;

  @Field()
  @Column({ length: 30 })
  stateResidence: string;

  @Field()
  @Column({ length: 30 })
  cityResidence: string;

  @Field()
  @Column({ length: 20 })
  phone: string;

  @Field()
  @Column({ length: 20 })
  landLine: string;

  @Field()
  @Column({ length: 50 })
  email: string;

  @Field()
  @Column({
    type: 'enum',
    enum: HousingType,
    nullable: false,
  })
  housingType: HousingType;

  @Field()
  @Column({
    type: 'enum',
    enum: Studies,
    nullable: false,
  })
  studies: Studies;

  @Field()
  @Column({ length: 80 })
  profession: string;

  @Field()
  @Column()
  foreignOperations: boolean;

  @Field()
  @Column()
  publicResources: boolean;

  @Field()
  @Column()
  publicRecognition: boolean;

  @Field()
  @Column()
  publicPower: boolean;

  @Field()
  @Column({ default: true })
  status: boolean;

  @Field(() => Affiliate, { nullable: true })
  @OneToOne(() => Affiliate, (affiliate) => affiliate.user, {
    cascade: ['remove', 'update'],
  })
  affiliate: Affiliate;

  @Field(() => Employee, { nullable: true })
  @OneToOne(() => Employee, (employee) => employee.user, {
    cascade: ['remove', 'update'],
  })
  employee: Employee;

  @Field(() => Provider, { nullable: true })
  @OneToOne(() => Provider, (provider) => provider.user, {
    cascade: ['remove', 'update'],
  })
  provider: Provider;

  @Field(() => [AccountMovement])
  @OneToMany(() => AccountMovement, (account_movement) => account_movement.user)
  account_movement: AccountMovement[];
}
