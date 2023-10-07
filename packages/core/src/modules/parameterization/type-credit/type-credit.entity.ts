import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SubAccount } from "../type-account/sub-account/sub-account.entity";
import { Auxiliary } from "../type-account/auxiliary/auxiliary.entity";
import { Account } from "../type-account/account/account.entity";
import { Credit } from "src/modules/wallet/credit/credit.entity";
@ObjectType()
@Entity()
export class TypeCredit {

   @Field()
   @PrimaryGeneratedColumn()
   id: number;

   @Field()
   @Column()
   name: string;
   
   @Field()
   @Column()
   interest:number;
   
   @Field(() => [Auxiliary])
   @ManyToMany(() => Auxiliary)
   @JoinTable()
   auxiliarys: Auxiliary[] ;

  

   @Field(() => [Credit])
   @OneToMany(() => Credit, credit => credit.typeCredit)
   credits: Credit[];

}
