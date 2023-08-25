import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { UserModule } from '../user/user.module';

@Module({
   imports:[TypeOrmModule.forFeature([Employee]),UserModule],

   providers: [EmployeeService, EmployeeResolver]
})
export class EmployeeModule {}
