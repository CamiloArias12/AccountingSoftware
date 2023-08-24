import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Auxiliary } from "../auxiliary/auxiliary.entity";
import { Account } from "../account/account.entity";

@ObjectType()
@Entity()
export class SubAccount {
   
   @Field()
   @PrimaryColumn()
   code: number;  

   @Field()
   @Column()
   name: string;  

   @Field()
   @Column()
   nature: string; 

   @ManyToOne(() => Account, account => account.subAccounts)
    account: Account;

    @OneToMany(() => Auxiliary, auxiliary => auxiliary.subAccount)
    auxiliaries: Auxiliary[];

}
