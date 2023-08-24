import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Auxiliary } from "../auxiliary/auxiliary.entity";
import { Account } from "../account/account.entity";
import { TypeAccount } from "../type-account.entity";

@ObjectType()
@Entity()
export class SubAccount {
   
   @Field()
   @PrimaryColumn()
   code: number;  

   @ManyToOne(() => Account, account => account.subAccounts)
    account: Account;

    @OneToMany(() => Auxiliary, auxiliary => auxiliary.subAccount)
    auxiliaries: Auxiliary[];

    @Field(() => TypeAccount)
    @OneToOne(() => TypeAccount, typeAccount => typeAccount.subAccount)
    @JoinColumn({ name: "code" })
    typeAccount: TypeAccount

}
