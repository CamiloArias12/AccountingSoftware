import { EmployeeService } from '../thirds/employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { Token } from './dto/payload';
export declare class AuthService {
    private employeeService;
    private jwtService;
    constructor(employeeService: EmployeeService, jwtService: JwtService);
    singIn(username: string, password: string): Promise<Token>;
}
