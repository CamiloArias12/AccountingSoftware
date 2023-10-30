import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Auxiliary } from "../type-account/auxiliary/auxiliary.entity";
import { Credit } from "src/modules/wallet/credit/credit.entity";
@ObjectType()
@Entity()
export class TypeCredit {

   @Field()
   @PrimaryGeneratedColumn()
   id: number;

   @Field()
   @Column()
   name: string;
   
   @Field()
   @Column({type:'double'})
   interest:number;
   
   @Field(() => [Auxiliary])
   @ManyToMany(() => Auxiliary,{nullable:false,onDelete:'CASCADE',onUpdate:'CASCADE'})
   @JoinTable()
   auxiliarys: Auxiliary[] ;

  

   @Field(() => [Credit])
   @OneToMany(() => Credit, credit => credit.typeCredit)
   credits: Credit[];

}
