import { Field, ObjectType} from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Auxiliary } from "../type-account/auxiliary/auxiliary.entity";
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
   @ManyToMany(() => Auxiliary)
   @JoinTable()
   auxiliarys: Auxiliary[];

  }
