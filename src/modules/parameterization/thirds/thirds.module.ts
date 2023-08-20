import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';

@Module({
   imports:[LocationModule, UserModule]

})
export class ThirdsModule {}
