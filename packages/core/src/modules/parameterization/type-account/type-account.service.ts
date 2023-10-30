import { Injectable} from '@nestjs/common';
import { AccountService } from './account/account.service';
import { AuxiliaryService } from './auxiliary/auxiliary.service';
import { ClassAccountService } from './class-account/class-account.service';
import { GroupService } from './group/group.service';
import { SubAccountService } from './sub-account/sub-account.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeAccount } from './type-account.entity';
import { DataSource, Repository } from 'typeorm';
import { NatureEnum, TypeAccountEnum } from './dto/enum-type';
import { ClassAccount } from './class-account/class-account.entity';
import { Group } from './group/group.entity';
import { Account } from './account/account.entity';
import { SubAccount } from './sub-account/sub-account.entity';
import { Auxiliary } from './auxiliary/auxiliary.entity';
import * as path from 'path';
import * as Excel from 'exceljs';
import { AccountTypeGeneral } from './dto/types';
import { TypeAccountInput } from './dto/type-account-input';
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
    private readonly dataSource:DataSource

  ) { }

  async create(data:TypeAccountInput,type:TypeAccountEnum,code?:number): Promise<boolean> {
     
     if(!await this.findOne(data.code)){
      const typeAccount = this.typeAccountRepository.create(data);
      let queryTypeAccount:TypeAccount=new TypeAccount()

      if(type===TypeAccountEnum.CLASS ){
        queryTypeAccount= await this.typeAccountRepository.save(typeAccount);
	const classAccount:ClassAccount= await this.classAccountService.create(queryTypeAccount);

	if(classAccount) return true;
       }

      if(type===TypeAccountEnum.GROUP && await this.findOne(code)){
        queryTypeAccount= await this.typeAccountRepository.save(typeAccount);
      	const classAccount= await this.classAccountService.findOne(code);
        const group:Group= await this.groupAccountService.create(queryTypeAccount,classAccount);

	if(group) return true;
       }

      if(type===TypeAccountEnum.ACCOUNT && await this.findOne(code)){
	queryTypeAccount= await this.typeAccountRepository.save(typeAccount);
      	const group:Group= await this.groupAccountService.findOne(code);
        const account:Account= await this.accountService.create(queryTypeAccount,group);

	if(account) return true;
       }

      if(type===TypeAccountEnum.SUBACCOUNT && await this.findOne(code)){
        queryTypeAccount= await this.typeAccountRepository.save(typeAccount);
      	const account:Account= await this.accountService.findOne(code);
        const subAccount:SubAccount= await this.subAccountService.create(queryTypeAccount,account);

	if(subAccount) return true;

       }

      if(type===TypeAccountEnum.AUXILIARY && await this.findOne(code)){
	 queryTypeAccount= await this.typeAccountRepository.save(typeAccount);
	 const subAccount:SubAccount= await this.subAccountService.findOne(code);
	 const auxiliary:Auxiliary= await this.auxiliaryService.create(queryTypeAccount,subAccount);

	if(auxiliary) return true;


       }
     }else{
	 return false
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

  async update(code: number, typeAccountData: TypeAccountInput): Promise<Boolean> {
      try {
	 await this.typeAccountRepository.update({code: code
	 }, { code: typeAccountData.code, name: typeAccountData.name, nature: typeAccountData.nature })
	 return true
      } catch (e) {
	 console.log(e)
	 return false 
      }
  }

  async delete (code:number):Promise<Boolean> {
      try {
	 await this.typeAccountRepository.delete(code) 
	 return true;
      } catch (e) {
	 console.log(e)
	 return false
      }
  }
 async updateStatus(code:number,status:boolean):Promise<Boolean>{
       try {
	 await this.typeAccountRepository.update({code:code},{state:status})
	 return true;
      } catch (e) {
	 console.log(e)
	 return false
      }

   }

  async loadTypeAccounts(pathname:string,filename:string){
      const filePath =path.join('./uploads',filename)
  

      const workbook = new Excel.Workbook();
      const content = await workbook.xlsx.readFile(filePath);

      const worksheet = content.worksheets[0];
   
      const rows = worksheet.getRows(2,worksheet.rowCount-1) ?? [];
      const allAccounts:AccountTypeGeneral[] = rows.map( (row):AccountTypeGeneral =>{
	    return {
	       type:(row.getCell(3).value).toString(),
	       typeAccount:{
	       code:Number((row.getCell(1).value).toString()),
	       name:row.getCell(2).value.toString(),
	       nature:row.getCell(4).value.toString()
	       } 
	 };
	 })
      
      

      const queryRunner =this.dataSource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      try {
	  let data:TypeAccount=new TypeAccount()
	  let dataClass:ClassAccount=new ClassAccount()
	  let account:Account=new Account()
	  let group:Group=new Group()
	  let subAccount:SubAccount=new SubAccount()
	  let auxiliary:Auxiliary=new Auxiliary()
	 for (let i = 0; i <allAccounts.length ; i++) {
	   data.name=allAccounts[i].typeAccount.name
	   data.code=allAccounts[i].typeAccount.code
	   data.nature=allAccounts[i].typeAccount.nature as NatureEnum
	   await queryRunner.manager.save(data)
	   if(allAccounts[i].type ===TypeAccountEnum.CLASS){
	     dataClass.typeAccount=data
	     await queryRunner.manager.findOne(TypeAccount,{where:{ code:dataClass.code}})
	     await queryRunner.manager.save(dataClass)
	   }

	 } 
	 for (let i = 0; i <allAccounts.length ; i++) {
	   if(allAccounts[i].type ===TypeAccountEnum.GROUP){
	      const code:string=allAccounts[i].typeAccount.code.toString()
	      data=await queryRunner.manager.findOne(TypeAccount,{where :{code:allAccounts[i].typeAccount.code}})
	      dataClass=await queryRunner.manager.findOne(ClassAccount,{where :{code:parseInt(code[0])}})
	      group.typeAccount=data
	      group.classAccount=dataClass
	        await queryRunner.manager.save(group)
	   }

	 } 

	 for (let i = 0; i <allAccounts.length ; i++) {
	   if(allAccounts[i].type ===TypeAccountEnum.ACCOUNT){
	      const code:string=allAccounts[i].typeAccount.code.toString()
	      data=await queryRunner.manager.findOne(TypeAccount,{where :{code:allAccounts[i].typeAccount.code}})
	      group=await queryRunner.manager.findOne(Group,{where :{code:parseInt(code.slice(0,2))}})
	      account.typeAccount=data
	      account.group=group
	       await queryRunner.manager.save(account)
	   }

	 } 

	 for (let i = 0; i <allAccounts.length ; i++) {
	   if(allAccounts[i].type ===TypeAccountEnum.SUBACCOUNT){
	      const code:string=allAccounts[i].typeAccount.code.toString()
	      data=await queryRunner.manager.findOne(TypeAccount,{where :{code:allAccounts[i].typeAccount.code}})
	      account=await queryRunner.manager.findOne(Account,{where :{code:parseInt(code.slice(0,4))}})
	      subAccount.typeAccount=data
	      subAccount.account=account
	      
	       await queryRunner.manager.save(subAccount)
	   }

	 } 
	 for (let i = 0; i <allAccounts.length ; i++) {
	   if(allAccounts[i].type ===TypeAccountEnum.AUXILIARY){
	      const code:string=allAccounts[i].typeAccount.code.toString()
	      data=await queryRunner.manager.findOne(TypeAccount,{where :{code:allAccounts[i].typeAccount.code}})
	      subAccount=await queryRunner.manager.findOne(SubAccount,{where :{code:parseInt(code.slice(0,6))}})
	      auxiliary.typeAccount=data
	      auxiliary.subAccount=subAccount
	      
	       await queryRunner.manager.save(auxiliary)
	   }

	 } 

	    await queryRunner.commitTransaction()
	 return true;
      }catch(a){
	 console.log("error",a)
	 await queryRunner.rollbackTransaction()
	 return false
      }finally{
	 await  queryRunner.release()
      }
       

     

   }
      

}
