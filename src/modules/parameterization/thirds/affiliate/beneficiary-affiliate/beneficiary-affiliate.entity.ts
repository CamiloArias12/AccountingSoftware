import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import { Beneficiary } from "../beneficiary/beneficiary.entity";
import { Field, ObjectType } from "@nestjs/graphql";
import { Affiliate } from "../affiliate.entity";

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
   @ManyToOne(() =>Beneficiary , beneficiary => beneficiary.beneficiaryAffiliate)
   @JoinColumn({name:"idBeneficiary"})   
   beneficiary:Beneficiary 

   @Field(() =>Affiliate)
   @ManyToOne(() =>Affiliate , affiliate => affiliate.beneficiaries)
   @JoinColumn({name:"idAffiliate"})   
   affiliate: Affiliate

}


