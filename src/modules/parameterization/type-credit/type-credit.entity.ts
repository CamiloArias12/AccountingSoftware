import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@ObjectType()
@Entity()
export class TypeCredit {
   
   @Field()
   @PrimaryColumn()
   id: number;

   @Field()
   @Column()
   nombre: string;

   @Field()
   @Column()
   cuentas: string;
}
