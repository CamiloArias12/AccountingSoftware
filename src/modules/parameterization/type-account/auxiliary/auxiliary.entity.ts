import { Field } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { SubAccount } from "../sub-account/sub-account.entity";

@Entity()
export class Auxiliary {
   
   @Field()
   @Column()
   code: number;  

   @Field()
   @Column()
   name: string;  

   @Field()
   @Column()
   nature: string; 

   @ManyToOne(() => SubAccount, subAccount => subAccount.auxiliaries)
    subAccount: SubAccount;

}