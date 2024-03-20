import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { QueryRunner, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InputEmployeeCreate } from './dto/createEmployee.dto';
import { RoleService } from '../role/role.service';
import { Role } from '../role/role.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly roleService: RoleService,
  ) {}

  async create(
    dto: InputEmployeeCreate,
    user: User,
    queryRunner?: QueryRunner,
  ): Promise<Employee> {
    const employee: Employee = new Employee();
    const rolesQuery: Role[] = [];
    for await (const role of dto.roles) {
      try {
        rolesQuery.push(await this.roleService.findOne(role));
      } catch (e) {
        /* handle error */
      }
    }
    employee.roles = rolesQuery;

    employee.user = user;
    employee.username = dto.username;
    employee.password = dto.password;

    if (dto.roles) {
    }
    if (queryRunner) {
      return await queryRunner.manager.save(Employee, employee);
    } else {
      return await this.employeeRepository.save(employee);
    }
  }

  async update(employee: Employee, id: number, roles?: number[]) {
    const rolesQuery: Role[] = [];
    for await (const role of roles) {
      rolesQuery.push(await this.roleService.findOne(role));
    }
    employee.roles = rolesQuery;
    employee.idEmployee = id;

    await this.employeeRepository.save(employee);
  }
  async count() {
    return await this.employeeRepository.count();
  }

  async delete(identification: number) {
    try {
      await this.employeeRepository.delete(identification);
    } catch (e) {
      await this.employeeRepository.update(
        { idEmployee: identification },
        { state: true },
      );
      /* handle error */
    }
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findByUsername(username: string, password: string): Promise<Employee> {
    const employee: Employee[] = await this.employeeRepository.find({
      where: {
        username: username,
        password: password,
      },
      relations: { user: true, roles: true },
    });
    return employee[0];
  }
}
