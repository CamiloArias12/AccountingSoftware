import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/input/createuser.dto';

@Injectable()
export class UserService {

   constructor(
      @InjectRepository(User)
      private readonly userRepository:Repository<User>
   ){}

   async createUser(dto:CreateUser): Promise<User >{
	 console.log(dto)
	 const user:User=this.userRepository.create(dto)
	 return await this.userRepository.save(user)
   } 

   async findOne(identification:number): Promise<User | null>{
      console.log(identification) 
      const user:User[]=await this.userRepository.find({relations:{
      affiliate:true,
      },where:{
	    identification:identification,
      }});

     console.log(user) 
      
      return user[0];
      
   }
}

