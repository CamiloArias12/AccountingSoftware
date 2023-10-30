import { ObjectType, Field} from '@nestjs/graphql';
import { Entity, JoinColumn, OneToOne, PrimaryColumn, } from 'typeorm';
import { User } from '../user/user.entity';


@ObjectType()
@Entity()
export class Provider { 
   @Field() 
   @PrimaryColumn()
   idProvider:number

   @Field(() =>Provider)
   @OneToOne(() => User ,user => user.provider,{onDelete:'CASCADE'})
   @JoinColumn({name: "idProvider"})
   user:User
}

