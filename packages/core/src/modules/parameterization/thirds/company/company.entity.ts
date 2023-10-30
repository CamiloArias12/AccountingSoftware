import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Regime, TypePerson } from "./dto/enum-type";
import { TypeIdentification } from "../user/dto/enum-type";


@ObjectType()
@Entity()
export class Company {
   
   @Field()
   @Column()
   typeIdentification:string


   @Field()
   @PrimaryColumn()
   numberIdentification:number 

   @Field()
   @Column()
   digitVerification:number
 
   @Field()
   @Column({
      type: "enum",
      enum: Regime,
  })
  regime: Regime;
 
   @Field()
   @Column({
   type: "enum",
      enum: TypePerson,
   })
   typePerson: TypePerson;

   @Field()
   @Column()
   socialReason:string

   @Field()
   @Column({
   type: "enum",
      enum: TypeIdentification,
   })
   legalRepresentativeTypeIdentificatio:TypeIdentification

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
