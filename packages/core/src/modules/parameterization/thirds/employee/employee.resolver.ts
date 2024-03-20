import { Resolver, Query, Int } from '@nestjs/graphql';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Resolver()
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee])
  async allEmployees(): Promise<Employee[]> {
    return await this.employeeService.findAll();
  }
  @Query(() => Int)
  async totalEmployees(): Promise<number> {
    return await this.employeeService.count();
  }

  /*
    @Query(() => User, { nullable: true })
    async employee(@Args('id') id: number): Promise<User> {
        return await this.employeeService.findOne(id);
    }
*/
}
