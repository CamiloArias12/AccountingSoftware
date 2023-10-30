import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Auxiliary } from "src/modules/parameterization/type-account/auxiliary/auxiliary.entity";
import { Credit } from "src/modules/wallet/credit/credit.entity";


@ObjectType()
@Entity()
export class CreditAccount{
  
   @Field()
   @PrimaryColumn()
   idCredit: number;

   @Field()
   @PrimaryColumn()
   idAccount: number;

   @Field()
   @Column()
   value:number
   
   @Field()
   @Column()
   concept:string

   @Field(() => Credit)
   @ManyToOne(() => Credit, credit => credit.creditAccounts,{onDelete:'CASCADE'})
   @JoinColumn({ name: 'idCredit' })
   credit: Credit;
   
   @Field(() => Auxiliary)
   @ManyToOne(() => Auxiliary, auxiliary=> auxiliary.creditAccounts)
   @JoinColumn({ name: 'idAccount' })
   account: Auxiliary;

  }



