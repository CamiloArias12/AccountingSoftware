import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { IAfiliate } from "./dto/afiliate.interface";
import { User } from "../user/user.entity";
import { BeneficiaryAffiliate } from "./beneficiary-affiliate/beneficiary-affiliate.entity";


@ObjectType()
@Entity()
export class Affiliate implements IAfiliate{ 

   @Field()
   @PrimaryColumn()
   idAffiliate:number

   @Field()
   @Column()
   company:string

   @Field()
   @Column()
   addreesCompany:string

   @Field()
   @Column()
   emailJob:string

   @Field()
   @Column()
   salary:number

   @Field()
   @Column()
   bank:string

   @Field()
   @Column()
   jobTitle:string

   @Field()
   @Column()
   phone:number

   @Field()
   @Column()
   incomeCompany:number

   @Field()
   @Column()
   typeAccount:string

   @Field()
   @Column()
   numberAccount:number


   @Field()
   @OneToOne(() => User,user => user.affiliate)
   @JoinColumn({name:'idAffiliate'})
   user:User
   
   @Field(() =>[BeneficiaryAffiliate])
   @OneToMany(() => BeneficiaryAffiliate ,beneficiaryAffiliate => beneficiaryAffiliate.affiliate)
   beneficiaries:BeneficiaryAffiliate[]

}

