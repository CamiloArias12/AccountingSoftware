import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { IEmployee } from "./dto/employee.interface";


@ObjectType()
@Entity()
export class Employee implements IEmployee{ 
   
   @PrimaryGeneratedColumn()
   idEmployee:number


   @Field()
   @Column()
   username:string

   @Field()
   @Column()
   password:string


   @OneToOne(() => User ,user => user.employee)
   @JoinColumn({name: "idEmployee"})
   user:User
}
