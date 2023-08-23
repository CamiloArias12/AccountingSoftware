import { Field } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TypeSaving {
   
   @Field()
   @Column()
   id: number;

   @Field()
   @Column()
   nombre: string;

   @Field()
   @Column()
   cuentas: string;
}