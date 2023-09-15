import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { UserService } from '../user/user.service';
import { CreateEmployee } from './dto/createEmployee.dto';
import { UserInput } from '../user/dto/input/createuser.dto';
export declare class EmployeeResolver {
    private readonly employeeService;
    private readonly userService;
    constructor(employeeService: EmployeeService, userService: UserService);
    createEmployee(inputEmployee: CreateEmployee, inputUser: UserInput): Promise<Employee>;
    createEmployeeUserExist(inputEmployee: CreateEmployee, identificationUser: number): Promise<Employee>;
    allEmployees(): Promise<Employee[]>;
}
