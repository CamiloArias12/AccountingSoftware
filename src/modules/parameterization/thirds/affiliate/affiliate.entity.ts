import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, TableInheritance } from "typeorm";
import { IAfiliate } from "./dto/afiliate.interface";


@ObjectType()
@Entity()
export class Afiliate implements IAfiliate{ 

   @Field()
   @Column()
   company:string

   @Field()
   @Column()
   addreesCompany:string

   @Field()
   @Column()
   emailJob:string

   @Field()
   @Column()
   salary:number

   @Field()
   @Column()
   bank:string

   @Field()
   @Column()
   jobTitle:string

   @Field()
   @Column()
   phone:number

   @Field()
   @Column()
   incomeCompany:number

   @Field()
   @Column()
   typeAccount:string

   @Field()
   @Column()
   numberAccount:number

}

