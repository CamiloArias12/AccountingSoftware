import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity';
import { LocationModule } from '../Location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, LocationModule])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}