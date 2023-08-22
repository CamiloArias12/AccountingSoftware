import { Field, ObjectType } from "@nestjs/graphql";
import { ChildEntity, Column } from "typeorm";
import { IBeneficiary } from "./dto/beneficiary-interface";
import { User } from "../user/user.entity";


@ObjectType()
@ChildEntity()
export class Beneficiary extends User implements IBeneficiary{

   @Field()
   @Column()
   name:string

   @Field()
   @Column()
   idDocument:number

   @Field()
   @Column()
   percentage:number
   
}
