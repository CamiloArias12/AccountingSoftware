import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne, PrimaryColumn, JoinColumn, OneToOne } from "typeorm";
import { SubAccount } from "../sub-account/sub-account.entity";
import { Group } from "../group/group.entity";
import { TypeAccount } from "../type-account.entity";
@ObjectType()
@Entity()
export class Account {

    @Field()
    @PrimaryColumn()
    code: number;

    @ManyToOne(() => Group, group => group.accounts,{onUpdate:'CASCADE'})
    group: Group;

    @OneToMany(() => SubAccount, subAccount => subAccount.account)
    subAccounts: SubAccount[];

    @Field(() => TypeAccount)
    @OneToOne(() => TypeAccount, typeAccount => typeAccount.account,{onUpdate:'CASCADE'})
    @JoinColumn({ name: "code" })
    typeAccount: TypeAccount

}
