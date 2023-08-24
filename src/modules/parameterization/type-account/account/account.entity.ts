import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { SubAccount } from "../sub-account/sub-account.entity";
import { Group } from "../group/group.entity";
@ObjectType()
@Entity()
export class Account {
   
   @Field()
   @PrimaryColumn()
   code: number;  

   @Field()
   @Column()
   name: string;  

   @Field()
   @Column()
   nature: string; 

   @ManyToOne(() => Group, group => group.accounts)
    group: Group;

    @OneToMany(() => SubAccount, subAccount => subAccount.account)
    subAccounts: SubAccount[];

}
