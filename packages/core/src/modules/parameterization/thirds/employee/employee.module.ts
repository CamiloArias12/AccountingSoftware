import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), RoleModule],

  providers: [EmployeeService, EmployeeResolver],

  exports: [EmployeeService],
})
export class EmployeeModule {}
