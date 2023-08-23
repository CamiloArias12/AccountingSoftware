import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Field } from "@nestjs/graphql";
import { ClassAccount } from './class-account/class-account.entity';

@Entity()
export class TypeAccount {

   @Field()
   @Column()
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

