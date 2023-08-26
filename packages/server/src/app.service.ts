import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
   constructor (private readonly configService:ConfigService){}


   getSecretKey():string{
      return this.configService.get('API_KEY');
   }
}
