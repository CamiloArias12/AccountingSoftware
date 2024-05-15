import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Account } from './account.entity';
import { TypeAccount } from '../type-account.entity';
import { Group } from '../group/group.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) { }

    async create(typeAccount:TypeAccount, group:Group): Promise<Account> {

	    const account: Account = new Account();
	    account.typeAccount = typeAccount;
	    account.group = group;

	    return await this.accountRepository.save(account);
    }

    async findAll(): Promise<Account[]> {
        return await this.accountRepository.find(
	  {
	    relations:{
	       typeAccount:true,
	    }
	 }
	);
    }
    async findAccounts(codes: number[]): Promise<Account[]> {
        return await this.accountRepository.find(
            { where: { code: In(codes) } }
        );
    }


    async findOne(code: number): Promise<Account> {
        const account = await this.accountRepository.findOne({
            where: {
                code,
            },
        });
        if (!account) {
            throw new NotFoundException(`Account with code ${code} not found`);
        }
        return account;
    }
   async findByGroup(code:number): Promise<Account[]> {
        return await this.accountRepository.find({
	     relations:{
		  typeAccount:true
	  	  },
	     where:{
		  group:{
		     code:code,
		  }
	     }
	 }
	);
      }

}
