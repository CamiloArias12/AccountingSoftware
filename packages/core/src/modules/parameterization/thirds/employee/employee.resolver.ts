import { Args, Mutation, Resolver,Query } from '@nestjs/graphql';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CreateEmployee } from './dto/createEmployee.dto';
import { UserInput } from '../user/dto/input/createuser.dto';

@Resolver()
export class EmployeeResolver {

   constructor(
      private readonly employeeService:EmployeeService,
      private readonly userService:UserService

   ){}
    @Mutation(() => Employee)
    async createEmployee(@Args('inputEmployee') inputEmployee: CreateEmployee, @Args('inputUser') inputUser:UserInput ): Promise<Employee> {

	  let user:User =await this.userService.createUser(inputUser,null)
	  return await this.employeeService.create(inputEmployee,user);
    }

    @Mutation(() => Employee)
    async createEmployeeUserExist(@Args('inputEmployee')inputEmployee:CreateEmployee ,@Args('idUser')identificationUser:number): Promise <Employee>{
	 let user:User=await this.userService.findOne(identificationUser)
	 
	 if(user){
	    return await  this.employeeService.create(inputEmployee,user)
	 }
    }

    @Query(() => [Employee])
    async allEmployees(): Promise<Employee[]> {
        return await this.employeeService.findAll();
    }
/*
    @Query(() => User, { nullable: true })
    async employee(@Args('id') id: number): Promise<User> {
        return await this.employeeService.findOne(id);
    }
*/

}
