import { Field, ObjectType } from "@nestjs/graphql";
import {  Entity,  ManyToOne, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { SubAccount } from "../sub-account/sub-account.entity";
import { TypeAccount } from "../type-account.entity";
@ObjectType()
@Entity()
export class Auxiliary {
   
   @Field()
   @PrimaryColumn()
   code: number;   

   @ManyToOne(() => SubAccount, subAccount => subAccount.auxiliaries,{onUpdate:'CASCADE'})
    subAccount: SubAccount;

    @Field(() => TypeAccount)
    @OneToOne(() => TypeAccount, typeAccount => typeAccount.auxiliary,{onUpdate:'CASCADE'})
    @JoinColumn({ name: "code" })
    typeAccount: TypeAccount

}
