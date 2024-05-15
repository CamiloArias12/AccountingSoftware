import { Field, InputType } from "@nestjs/graphql";

 @InputType()
 export class ValidateField{
    @Field()
    name:string
    
    value:string
 }
