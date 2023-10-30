import { Field, ObjectType } from "@nestjs/graphql";

export enum StateCredit {
   APROBADO="Aprobado",
   CURSO="En curso",
   FINALIZADO="Finalizado",
   REFINANCIADO="Refinanciado",
   MORA="En mora"

}


@ObjectType()
export class RefinanceCredit{
   @Field()
   nameAffiliate:string

   @Field()
   identification:number

   @Field()
   previewBalance:number

   @Field()
   typeCredit:string

   @Field()
   interest:number

   @Field()
   idTypeCredit:number


}
