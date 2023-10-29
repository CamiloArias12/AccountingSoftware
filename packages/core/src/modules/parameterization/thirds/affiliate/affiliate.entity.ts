import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import { IAfiliate } from "./dto/afiliate.interface";
import { User } from "../user/user.entity";
import { BeneficiaryAffiliate } from "./beneficiary-affiliate/beneficiary-affiliate.entity";
import { Credit } from "src/modules/wallet/credit/credit.entity";
import { Saving } from "src/modules/wallet/saving/saving.entity";


@ObjectType()
@Entity()
export class Affiliate implements IAfiliate {

   @PrimaryColumn()
   idAffiliate: number

   @Field()
   @Column()
   company: string

   @Field()
   @Column()
   addreesCompany: string

   @Field()
   @Column()
   emailJob: string

   @Field()
   @Column()
   salary: number

   @Field()
   @Column()
   bank: string

   @Field()
   @Column()
   jobTitle: string

   @Field()
   @Column()
   phone: number

   @Field()
   @Column('date')
   incomeCompany:Date 

   @Field()
   @Column()
   typeAccount: string

   @Field()
   @Column()
   numberAccount: number



   @Field(()=> User)
   @OneToOne(() => User, user => user.affiliate,{onDelete:'CASCADE'})
   @JoinColumn({ name: 'idAffiliate' })
   user: User

   @Field(() => [BeneficiaryAffiliate])
   @OneToMany(() => BeneficiaryAffiliate, beneficiaryAffiliate => beneficiaryAffiliate.affiliate)
   beneficiaries: BeneficiaryAffiliate[]

   @Field(() => [Credit])
   @OneToMany(() => Credit, credit => credit.affiliate, { cascade: true, eager: true })
   credits: Credit[];

   @Field(() => [Saving])
   @OneToMany(() => Saving, saving => saving.affiliate, { cascade: true, eager: true })
   savings: Saving[];


}

