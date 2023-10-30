import { Injectable} from '@nestjs/common';
import { User } from '../user/user.entity';
import { QueryRunner } from 'typeorm';
import { Provider} from './provider.entity';

@Injectable()
export class ProviderService {
  async create(user:User,queryRunner:QueryRunner):Promise <Provider> {

     const provider:Provider=new Provider()
     provider.user=user
     
     
    return await queryRunner.manager.save(Provider,provider);
  }

  findAll() {
    return `This action returns all provider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }
  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
