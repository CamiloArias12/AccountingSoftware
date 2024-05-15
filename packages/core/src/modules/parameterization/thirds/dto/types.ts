import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Thirds {
   @Field()
   id:number

   @Field()
   name:string

}
