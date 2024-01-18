import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeModule } from '../thirds/employee/employee.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guards';

@Module({
  imports: [
    EmployeeModule,
    JwtModule.register({
      global: true,
      secret: 'Hello',
      signOptions: { expiresIn: '2h' },
    }),
    EmployeeModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
