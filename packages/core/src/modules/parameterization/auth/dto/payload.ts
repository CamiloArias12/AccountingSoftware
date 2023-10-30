import { Field, ObjectType } from "@nestjs/graphql"

export type payload ={
   id:number
   name:string

}

@ObjectType()
export class Token {

   @Field()
   token:string
}
