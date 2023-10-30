import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { ClassAccount } from './class-account.entity';
import { TypeAccount } from '../type-account.entity';

@Injectable()
export class ClassAccountService {
  constructor(
    @InjectRepository(ClassAccount)
    private readonly classAccountRepository: Repository<ClassAccount>,
  ) { }

  async create(typeAccount:TypeAccount,queryRunner?:QueryRunner): Promise<ClassAccount> {
      const classAccount = new ClassAccount();
      classAccount.typeAccount = typeAccount
      return await this.classAccountRepository.save(classAccount);
  }


  async findOne(code: number): Promise<ClassAccount> {
    return  await this.classAccountRepository.findOne({
      where: {
        code,
      },
    });
  }

  async findAll(): Promise<ClassAccount[]> {
      return await this.classAccountRepository.find(
	 {
	    relations:{
	       typeAccount:true,
	       groups:{
		  typeAccount:true,
		  accounts:{
		     typeAccount:true,
		     subAccounts:{
			typeAccount:true,
			auxiliaries:{
			   typeAccount:true
			}
		     }
		  }

	       }
	    }
	 }
      );
  }


}

