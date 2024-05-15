import { Field, InputType } from "@nestjs/graphql";
import { TypeAccountCreditEnum } from "../../type-credit/dto/enum-types";
import { NatureEnum } from "../../type-account/dto/enum-type";


@InputType()
export class AuxiliarySaving {
   @Field()
   account:number

   @Field()
   percentage:number

   @Field()
   nature:NatureEnum
}
