import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '../employee/employee.entity';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const employee:Employee = await this.employeeService.findByUsername(username,password);
    if (!employee) {
      throw new UnauthorizedException();
    }
    const payload = { username: employee.idEmployee, password: employee.password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
