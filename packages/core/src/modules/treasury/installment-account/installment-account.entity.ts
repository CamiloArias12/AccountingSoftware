import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn,  ManyToOne, PrimaryColumn, } from "typeorm";
import { Auxiliary } from "src/modules/parameterization/type-account/auxiliary/auxiliary.entity";
import { Installment } from "src/modules/wallet/credit/installments/installment.entity";

@ObjectType()
@Entity()
export class InstallmentAccount{
  
   @Field()
   @PrimaryColumn()
   numberInstallment: number;
  
   @Field()
   @PrimaryColumn()
   id_credit: number;

   @Field()
   @PrimaryColumn()
   idAccount: number;


   @Field()
   @Column()
   value:number

   @Field()
   @Column('date')
   date:Date

   @Field()
   @Column()
   concept:string


   @Field(() => Installment)

   @ManyToOne(() => Installment, installment=> installment.interestAccount)
   @JoinColumn([{name:"numberInstallment",referencedColumnName:"installmentNumber"},
	        {name:"id_credit",referencedColumnName:"id_credit"}         
	 ])
   installment: Installment;
  
   @Field(() => Auxiliary)
   @ManyToOne(() => Auxiliary, auxiliary=> auxiliary.installmentInterest)
   @JoinColumn({name:"idAccount"})
   account: Auxiliary;

  }



