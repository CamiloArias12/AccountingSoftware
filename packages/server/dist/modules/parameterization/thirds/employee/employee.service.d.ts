import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployee } from './dto/createEmployee.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
export declare class EmployeeService {
    private readonly employeeRepository;
    private readonly userService;
    constructor(employeeRepository: Repository<Employee>, userService: UserService);
    create(dto: CreateEmployee, user: User): Promise<Employee>;
    findAll(): Promise<Employee[]>;
    findOne(numberAccount: number): Promise<User>;
    findByUsername(username: string, password: string): Promise<Employee>;
}
