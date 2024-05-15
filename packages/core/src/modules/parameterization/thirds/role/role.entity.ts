import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../employee/employee.entity';

@ObjectType()
@Entity()
export class Role {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 40 })
  name: string;

  @Field()
  @Column({ default: false })
  third: boolean;

  @Field()
  @Column({ default: false })
  credit: boolean;

  @Field()
  @Column({ default: false })
  saving: boolean;

  @Field()
  @Column({ default: false })
  type_account: boolean;

  @Field()
  @Column({ default: false })
  type_saving: boolean;
  @Field()
  @Column({ default: false })
  type_credit: boolean;

  @Field()
  @Column({ default: false })
  movement: boolean;

  @Field()
  @Column({ default: false })
  deferred: boolean;

  @Field()
  @Column({ default: false })
  cash: boolean;

  @Field()
  @Column({ default: false })
  roles: boolean;

  @Field()
  @Column({ default: false })
  note: boolean;

  @Field()
  @Column({ default: false })
  book_auxiliary: boolean;

  @Field()
  @Column({ default: false })
  disbursementvoucher: boolean;
}
