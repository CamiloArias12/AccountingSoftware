import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployee } from './dto/createEmployee.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class EmployeeService {
   constructor (
      @InjectRepository(Employee)
      private readonly employeeRepository:Repository<Employee>,
      private readonly userService:UserService
   ){}

   async create(dto: CreateEmployee,user:User): Promise<Employee> {
        const employee = this.employeeRepository.create(dto);
	employee.user= user
        const result:Employee=await this.employeeRepository.save(employee);
	console.log("Result",result)
	 return result;
    }

    async findAll(): Promise<Employee[]> {
        return await this.employeeRepository.find();
    }

    async findOne(numberAccount: number): Promise<User> {
        const user:User = await this.userService.findOne(numberAccount)
        return user;
    }

    async findByUsername(username:string,password:string):Promise<Employee>{
         const employee:Employee[]= await this.employeeRepository.find({
	   where:{
	    username:username,
	    password:password
	   } 
	 })
        return employee[0];
    }

  
}
