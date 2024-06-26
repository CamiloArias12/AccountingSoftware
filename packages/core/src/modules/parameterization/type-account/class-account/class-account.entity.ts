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
   
    @Field({defaultValue:"Clase"})
    type:string
   
    @Field(() => [Group],{name:"accounts"})
    @OneToMany(() => Group, group => group.classAccount)
    groups: Group[];

    @Field(() => TypeAccount)
    @OneToOne(() => TypeAccount, typeAccount => typeAccount.classAccount,{onUpdate:'CASCADE',onDelete:'CASCADE'})
    @JoinColumn({ name: "code" })
    typeAccount: TypeAccount;

}
