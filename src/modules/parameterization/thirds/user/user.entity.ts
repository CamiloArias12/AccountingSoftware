import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, TableInheritance } from "typeorm";


@ObjectType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export   abstract class User{

   @Field()
   @PrimaryColumn()
   identification:number;

   @Field()
   @Column()
   name:string

}
