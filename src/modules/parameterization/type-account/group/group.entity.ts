import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Account } from "../account/account.entity";
import { ClassAccount } from "../class-account/class-account.entity";
import { TypeAccount } from "../type-account.entity";

@ObjectType()
@Entity()
export class Group {

    @Field()
    @PrimaryColumn()
    code: number;

    @ManyToOne(() => ClassAccount, classAccount => classAccount.groups)
    classAccount: ClassAccount;

    @OneToMany(() => Account, account => account.group)
    accounts: Account[];

    @Field(() => TypeAccount)
    @OneToOne(() => TypeAccount, typeAccount => typeAccount.group)
    @JoinColumn({ name: "code" })
    typeAccount: TypeAccount

}
