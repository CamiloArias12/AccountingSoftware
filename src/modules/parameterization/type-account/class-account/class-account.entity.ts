import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Group } from "../group/group.entity";
import { TypeAccount } from "../type-account.entity";

@ObjectType()
@Entity()
export class ClassAccount {

    @Field()
    @PrimaryColumn()
    code: number;

    @OneToMany(() => Group, group => group.classAccount)
    groups: Group[];

    @ManyToOne(() => TypeAccount, typeAccount => typeAccount.classAccounts)
    typeAccount: TypeAccount;

    @Field(() => TypeAccount)
    @OneToOne(() => TypeAccount, typeAccountt => typeAccountt.classAccount)
    @JoinColumn({ name: "code" })
    typeAccountt: TypeAccount

}
