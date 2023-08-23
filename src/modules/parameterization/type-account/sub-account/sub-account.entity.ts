import { Field } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { Auxiliary } from "../auxiliary/auxiliary.entity";
import { Account } from "../account/account.entity";


@Entity()
export class SubAccount {
   
   @Field()
   @Column()
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