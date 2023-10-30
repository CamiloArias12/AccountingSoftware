import { Injectable } from '@nestjs/common';
import { EmployeeService } from '../thirds/employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { payload, Token } from './dto/payload';
import { Employee } from '../thirds/employee/employee.entity';

@Injectable()
export class AuthService {
      
   constructor (
      private employeeService:EmployeeService,
      private jwtService:JwtService
   ){}

   async singIn(username:string, password:string):Promise<Token> {
      
      const employee:Employee =await this.employeeService.findByUsername(username,password)

      if(employee){
	 const payload:payload={
	    id:employee.idEmployee,
	    name:employee.password
	 }

	 return {
	       token:await this.jwtService.signAsync(payload)
	 }

      }

   }
}
