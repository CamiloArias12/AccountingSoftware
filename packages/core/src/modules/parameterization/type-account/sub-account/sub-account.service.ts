import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SubAccount } from './sub-account.entity';
import { TypeAccount } from '../type-account.entity';
import { Account } from '../account/account.entity';

@Injectable()
export class SubAccountService {
    constructor(
        @InjectRepository(SubAccount)
        private readonly subAccountRepository: Repository<SubAccount>,
    ) { }

   async create(typeAccount:TypeAccount, account:Account): Promise<SubAccount> {
	    const subAccount: SubAccount= new SubAccount();
	    subAccount.typeAccount = typeAccount;
	    subAccount.account = account;
	    
	    return await this.subAccountRepository.save(subAccount);
      }

    async findAll(): Promise<SubAccount[]> {
        return await this.subAccountRepository.find(
	    {relations:{
	    typeAccount:true
	 }}
	);
    }

    async findOne(code: number): Promise<SubAccount> {
        const subAccount = await this.subAccountRepository.findOne({
            where: {
                code,
            },
        });
        if (!subAccount) {
            throw new NotFoundException(`SubAccount with code ${code} not found`);
        }
        return subAccount;
    }
   async findSubAccounts(codes: number[]): Promise<SubAccount[]> {
        return await this.subAccountRepository.find(
            { where: { code: In(codes) } }
        );
    }

    async findByAccount(code:number): Promise<SubAccount[]> {
        return await this.subAccountRepository.find({
	     relations:{
		  typeAccount:true
	  	  },
	     where:{
		  account:{
		     code:code,
		  }
	     }
	 }
	);
      }


}

