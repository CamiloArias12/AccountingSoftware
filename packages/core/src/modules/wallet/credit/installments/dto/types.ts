import { Field, InputType,  ObjectType } from "@nestjs/graphql"
import { CreateInstallment } from "./create-installment.input"


@InputType()
export class ChangeAmortization{
  @Field(() =>[CreateInstallment])
   tableAmortization:CreateInstallment[]

}

@InputType("InputTypeInstallmentPayment")
@ObjectType("InstallmentPayment")
export class InstallmentPayment{

   @Field()
   installmentNumber:number

   @Field()
   credit:number
   
   @Field()
   paymentDate:Date
   
   @Field()
   scheduledPayment:number
   
   @Field()
   interest:number
   
   @Field()
   finalBalance:number
   
   @Field()
   identification:number
   
   @Field()
   name:string
   
   @Field()
   lastName:string

   @Field()
   typeCredit:string

   @Field()
   extraPayment:number
   
   @Field()
   totalPayment:number 
   
   @Field()
   capital:number

   @Field()
   interestPayment:number

   @Field()
   idTypeCredit:number

   @Field({defaultValue:false})
   isSelected:boolean

}

