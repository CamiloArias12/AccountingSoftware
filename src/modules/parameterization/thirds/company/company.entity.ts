import { Field } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";


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
   @Column()
   regime:string
 
   @Field()
   @Column()
   typePerson:string

   @Field()
   @Column()
   socialReason:string

   @Field()
   @Column()
   legalRepresentativeTypeIdentificatio:string

   @Field()
   @Column()
   legalRepresentativeName:string 


 


 

}
