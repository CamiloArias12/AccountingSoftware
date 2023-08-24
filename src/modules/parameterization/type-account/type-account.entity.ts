import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn} from 'typeorm';
import { Field, ObjectType } from "@nestjs/graphql";
import { ClassAccount } from './class-account/class-account.entity';

@ObjectType()
@Entity()
export class TypeAccount {

   @Field()
   @PrimaryColumn()
   code: number;  

   @Field()
   @Column()
   name: string;  

   @Field()
   @Column()
   nature: string; 

    @Column({ type: 'text', nullable: true })
    description?: string;

    @OneToMany(() => ClassAccount, classAccount => classAccount.typeAccount)
    classAccounts: ClassAccount[];
}

