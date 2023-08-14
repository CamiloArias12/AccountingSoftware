import { Field, ObjectType } from "@nestjs/graphql";
import { ChildEntity, Column } from "typeorm";
import { User } from "../user/user.entity";


@ObjectType()
@ChildEntity()
export default class Provider extends User{

   @Field()
   @Column()
   product:string


}
