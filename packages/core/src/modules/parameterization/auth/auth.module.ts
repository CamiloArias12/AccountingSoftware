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
      secret: 'FoncastelHello',
      signOptions: { expiresIn: '3h' },
    }),
    EmployeeModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    AuthService,
    AuthResolver,
  ],
})
export class AuthModule {}
