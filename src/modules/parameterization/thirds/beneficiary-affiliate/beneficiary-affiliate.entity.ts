import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import { Affiliate } from "../affiliate/affiliate.entity";
import { Beneficiary } from "../beneficiary/beneficiary.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class BeneficiaryAffiliate{
 
   
   @PrimaryColumn()
   idAffiliate: number;
   
   @PrimaryColumn()
   idBeneficiary:number;
   
   @Field()
   @Column()
   percentage:number

   @Field(() =>Beneficiary)
   @ManyToOne(() =>Beneficiary , beneficiary => beneficiary.affiliate)
   @JoinColumn({name:"idBeneficiary"})   
   beneficiary:Beneficiary 

   @Field(() =>Affiliate)
   @ManyToOne(() =>Affiliate ,affiliate => affiliate.beneficiary)
   @JoinColumn({name:"idAffiliate"})   
   afiliate: Affiliate

}


