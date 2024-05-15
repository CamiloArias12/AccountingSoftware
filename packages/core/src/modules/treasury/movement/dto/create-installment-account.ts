import { Field, InputType } from "@nestjs/graphql";
import { InstallmentPayment } from "src/modules/wallet/credit/installments/dto/types";

@InputType()
export class InputCreateInstallmentAccount {
   
   @Field(() =>[InstallmentPayment])
   installments:InstallmentPayment[]

   @Field()
   date:Date

   @Field()
   concept:string

}
