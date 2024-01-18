import { Field, ObjectType} from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Auxiliary } from "../type-account/auxiliary/auxiliary.entity";
import { Saving } from "src/modules/wallet/saving/saving.entity";
import { TypeSavingAccount } from "./type-saving-account/type-saving-account.entity";

@ObjectType()
@Entity()
export class TypeSaving {

   @Field()
   @PrimaryGeneratedColumn()
   id: number;

   @Field()
   @Column()
   name: string;

   @Field(() => [Saving])
   @OneToMany(() => Saving, saving => saving.typeSaving)
   savings: Saving[];

   @Field(() => [TypeSavingAccount])
   @OneToMany(() => TypeSavingAccount, typeSavingAccount=> typeSavingAccount.typeSaving,{nullable:false,cascade:['insert']})
   auxiliaries: TypeSavingAccount[]
}
