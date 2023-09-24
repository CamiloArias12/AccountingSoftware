import { ObjectType, Field} from '@nestjs/graphql';
import { Entity, JoinColumn, OneToOne, PrimaryColumn, } from 'typeorm';
import { User } from '../user/user.entity';


@ObjectType()
@Entity()
export class Provider { 
   
   @PrimaryColumn()
   idProvider:number

   @Field(() =>Provider)
   @OneToOne(() => User ,user => user.provider)
   @JoinColumn({name: "idProvider"})
   user:User
}

