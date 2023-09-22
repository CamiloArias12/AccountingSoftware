import { Field } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { Regime, TypePerson } from "./dto/enum-type";


@Entity()
export class Company {
   
   @Field()
   @Column()
   typeIdentification:string


   @Field()
   @Column()
   numberIdentification:number 

   @Field()
   @Column()
   digitVerification:number
 
   @Field()
   @Column({
      type: "enum",
      enum: Regime,
      default: Regime.NO_RESPONSABLE_IUVA 
  })
  regime: Regime;
 
  @Column({
   type: "enum",
      enum: TypePerson,
      default: TypePerson.SOCIEDAD_COMANDITA_ACCIONES 
   })
   typePerson: TypePerson;

   @Field()
   @Column()
   socialReason:string

   @Field()
   @Column()
   legalRepresentativeTypeIdentificatio:string

   @Field()
   @Column()
   legalRepresentativeName:string 

   @Field()
   @Column()
   legalRepresentativeDocument:string 

   @Field()
   @Column()
   natureCompany: string

}
