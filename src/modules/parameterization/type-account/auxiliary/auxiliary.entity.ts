import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { SubAccount } from "../sub-account/sub-account.entity";
@ObjectType()
@Entity()
export class Auxiliary {
   
   @Field()
   @PrimaryColumn()
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
