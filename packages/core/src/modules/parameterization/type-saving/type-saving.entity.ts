import { Field, ObjectType} from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Auxiliary } from "../type-account/auxiliary/auxiliary.entity";
import { Saving } from "src/modules/wallet/saving/saving.entity";

@ObjectType()
@Entity()
export class TypeSaving {

   @Field()
   @PrimaryGeneratedColumn()
   id: number;

   @Field()
   @Column()
   name: string;

   @Field(() => [Auxiliary])
   @ManyToMany(() => Auxiliary,{nullable:false,onDelete:'CASCADE',onUpdate:'CASCADE'})
   @JoinTable()
   auxiliarys: Auxiliary[];

   @Field(() => [Saving])
   @OneToMany(() => Saving, saving => saving.typeSaving)
   savings: Saving[];


}
