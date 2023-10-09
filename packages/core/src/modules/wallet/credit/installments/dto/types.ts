import { Field, InputType, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class AmortizationTable {
   @Field()
   numberInstallment:number
   @Field()
   date:Date
   @Field()
   loanInitial:number
   @Field()
   loanProgramer:number
   @Field()
   loanExtra:number
   @Field()
   loanTotal:number
   @Field()
   capital:number
   @Field()
   interest:number
   @Field()
   finalBalance:number


}

@InputType()
export class ChangeAmortization{
  @Field(() =>[AmortizationTableChange])
   table:AmortizationTableChange[]

}


@InputType()
export class AmortizationTableChange {
   @Field()
   numberInstallment:number
   @Field(() =>Date)
   date:Date
   @Field()
   loanInitial:number
   @Field()
   loanProgramer:number
   @Field()
   loanExtra:number
   @Field()
   loanTotal:number
   @Field()
   capital:number
   @Field()
   interest:number
   @Field()
   finalBalance:number


}

