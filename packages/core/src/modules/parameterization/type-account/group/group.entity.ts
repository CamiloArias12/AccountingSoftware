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
   
    @Field({defaultValue:"Grupo"})
    type:string

    @ManyToOne(() => ClassAccount, classAccount => classAccount.groups,{onUpdate:'CASCADE'})
    classAccount: ClassAccount;
    @Field(() => [Account],{name:"accounts"})
    @OneToMany(() => Account, account => account.group)
    accounts: Account[];

    @Field(() => TypeAccount)
    @OneToOne(() => TypeAccount, typeAccount => typeAccount.group,{onUpdate:'CASCADE',onDelete:'CASCADE'})
    @JoinColumn({ name: "code" })
    typeAccount: TypeAccount

}
