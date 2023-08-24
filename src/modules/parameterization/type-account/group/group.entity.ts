import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Account } from "../account/account.entity";
import { ClassAccount } from "../class-account/class-account.entity";

@ObjectType()
@Entity()
export class Group {

    @Field()
    @PrimaryColumn()
    code: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    nature: string;

    @ManyToOne(() => ClassAccount, classAccount => classAccount.groups)
    classAccount: ClassAccount;

    @OneToMany(() => Account, account => account.group)
    accounts: Account[];

}
