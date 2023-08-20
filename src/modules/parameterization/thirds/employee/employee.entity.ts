import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";


@ObjectType()
@Entity()
export class Employee{ 
   
   @Field()
   @Column()
   username:string

   @Field()
   @Column()
   password:string

}

