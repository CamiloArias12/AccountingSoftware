import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { AuthModule } from '../auth/auth.module';


@Module({
   imports:[UserModule,LocationModule,AuthModule ],
   providers: []

})
export class ThirdsModule {}
