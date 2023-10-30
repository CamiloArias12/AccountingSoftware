import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { QueryRunner, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InputEmployeeCreate } from './dto/createEmployee.dto';

@Injectable()
export class EmployeeService {
   constructor (
      @InjectRepository(Employee)
      private readonly employeeRepository:Repository<Employee>,
   ){}

   async create(dto: InputEmployeeCreate,user:User, queryRunner:QueryRunner): Promise<Employee> {

        const employee:Employee = this.employeeRepository.create(dto);
	employee.user=user
	 
	return await queryRunner.manager.save(Employee,employee);
    }

    async findAll(): Promise<Employee[]> {
        return await this.employeeRepository.find();
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
