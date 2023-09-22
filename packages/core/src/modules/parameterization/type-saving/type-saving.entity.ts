import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SubAccount } from "../type-account/sub-account/sub-account.entity";
import { Auxiliary } from "../type-account/auxiliary/auxiliary.entity";
import { Account } from "../type-account/account/account.entity";
@ObjectType()
@Entity()
export class TypeSaving {

   @Field()
   @PrimaryColumn()
   idTypeSaving: number;

   @Field()
   @Column()
   nombre: string;

   @ManyToMany(() => SubAccount)
   @JoinTable()
   subAccounts: SubAccount[] | null;

   @ManyToMany(() => Auxiliary)
   @JoinTable()
   auxiliarys: Auxiliary[] | null;

   @ManyToMany(() => Account)
   @JoinTable()
   accounts: Account[] | null;

}
