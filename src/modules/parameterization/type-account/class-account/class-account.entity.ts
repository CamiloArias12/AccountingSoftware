import { Field } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { Group } from "../group/group.entity";
import { TypeAccount } from "../type-account.entity";

@Entity()
export class ClassAccount {

    @Field()
    @Column()
    code: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    nature: string;

    @OneToMany(() => Group, group => group.classAccount)
    groups: Group[];

    @ManyToOne(() => TypeAccount, typeAccount => typeAccount.classAccounts)
    typeAccount: TypeAccount;

}