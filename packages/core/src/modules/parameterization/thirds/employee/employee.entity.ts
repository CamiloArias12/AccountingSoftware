import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { IEmployee } from './dto/employee.interface';
import { Role } from '../role/role.entity';

@ObjectType()
@Entity()
export class Employee implements IEmployee {
  @PrimaryColumn('bigint')
  idEmployee: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Column({ default: false })
  state: boolean;

  @OneToOne(() => User, (user) => user.employee, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'idEmployee' })
  user: User;

  @Field(() => [Role])
  @ManyToMany(() => Role, { nullable: false })
  @JoinTable({ name: 'employee_roles' })
  roles: Role[];
}
