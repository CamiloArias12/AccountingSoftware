import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';

@Module({
   imports:[TypeOrmModule.forFeature([Employee])],

   providers: [EmployeeService, EmployeeResolver],

   exports:[EmployeeService]
})
export class EmployeeModule {}
