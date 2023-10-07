import { Injectable} from '@nestjs/common';
import { AccountService } from './account/account.service';
import { AuxiliaryService } from './auxiliary/auxiliary.service';
import { ClassAccountService } from './class-account/class-account.service';
import { GroupService } from './group/group.service';
import { SubAccountService } from './sub-account/sub-account.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeAccount } from './type-account.entity';
import { Repository } from 'typeorm';
import { CreateTypeAccount } from './dto/createTypeAccount';
import { TypeAccountEnum } from './dto/enum-type';
import { ClassAccount } from './class-account/class-account.entity';
import { Group } from './group/group.entity';
import { Account } from './account/account.entity';
import { SubAccount } from './sub-account/sub-account.entity';
import { Auxiliary } from './auxiliary/auxiliary.entity';

@Injectable()
export class TypeAccountService {

  constructor(
    @InjectRepository(TypeAccount)
    private readonly typeAccountRepository: Repository<TypeAccount>,
    private readonly classAccountService:ClassAccountService,
    private readonly groupAccountService:GroupService,
    private readonly accountService:AccountService,
    private readonly subAccountService:SubAccountService,
    private readonly auxiliaryService:AuxiliaryService,

  ) { }

  async create(data:CreateTypeAccount,type:TypeAccountEnum,code?:number): Promise<TypeAccount> {
     
     if(!await this.findOne(data.code)){
      const typeAccount = this.typeAccountRepository.create(data);
      let queryTypeAccount:TypeAccount=new TypeAccount()

      if(type===TypeAccountEnum.CLASS ){
        queryTypeAccount= await this.typeAccountRepository.save(typeAccount);
	const classAccount:ClassAccount= await this.classAccountService.create(queryTypeAccount);

	if(classAccount) return queryTypeAccount;
       }

      if(type===TypeAccountEnum.GROUP && await this.findOne(code)){
        queryTypeAccount= await this.typeAccountRepository.save(typeAccount);
      	const classAccount= await this.classAccountService.findOne(code);
        const group:Group= await this.groupAccountService.create(queryTypeAccount,classAccount);

	if(group) return queryTypeAccount;
       }

      if(type===TypeAccountEnum.ACCOUNT && await this.findOne(code)){
	queryTypeAccount= await this.typeAccountRepository.save(typeAccount);
      	const group:Group= await this.groupAccountService.findOne(code);
        const account:Account= await this.accountService.create(queryTypeAccount,group);

	if(account) return queryTypeAccount;
       }

      if(type===TypeAccountEnum.SUBACCOUNT && await this.findOne(code)){
        queryTypeAccount= await this.typeAccountRepository.save(typeAccount);
      	const account:Account= await this.accountService.findOne(code);
        const subAccount:SubAccount= await this.subAccountService.create(queryTypeAccount,account);

	if(subAccount) return queryTypeAccount;

       }

      if(type===TypeAccountEnum.AUXILIARY && await this.findOne(code)){
	 queryTypeAccount= await this.typeAccountRepository.save(typeAccount);
	 const subAccount:SubAccount= await this.subAccountService.findOne(code);
	 const auxiliary:Auxiliary= await this.auxiliaryService.create(queryTypeAccount,subAccount);

	if(auxiliary) return queryTypeAccount;


       }
     }



  }

  async findAll(): Promise<TypeAccount[]> {
    return await this.typeAccountRepository.find(
    );
  }

  async findOne(code: number): Promise<TypeAccount> {
    return await this.typeAccountRepository.findOne({ where: { code } }).then((data:TypeAccount) => {
      if(data){
	 return data;
      }else{
	 return null;
      }
    });
  }

  async update(code: number, typeAccountData: TypeAccount): Promise<TypeAccount> {

    return await this.typeAccountRepository.update({
      code: code
    }, { code: typeAccountData.code, name: typeAccountData.name, nature: typeAccountData.nature }).then((data) => {
      if (data.affected != 0)
        return this.findOne(typeAccountData.code);
    })
  }

}
