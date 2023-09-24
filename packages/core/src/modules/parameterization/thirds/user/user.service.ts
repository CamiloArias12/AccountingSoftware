import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource,  Repository } from 'typeorm';
import { UserInput } from './dto/input/createuser.dto';
import { AffiliateService } from '../affiliate/affiliate.service';
import { InputAffiliateCreate } from '../affiliate/dto/InputAffiliate';
import { InputEmployeeCreate } from '../employee/dto/createEmployee.dto';
import { EmployeeService } from '../employee/employee.service';
import { ProviderService } from '../provider/provider.service';

@Injectable()
export class UserService {

   constructor(
      @InjectRepository(User)
      private readonly userRepository:Repository<User>,
      private readonly affiliateService:AffiliateService,
      private readonly employeeService:EmployeeService,
      private readonly providerService:ProviderService,

      private readonly dataSource:DataSource
   ){}

   async create(dto:UserInput,affiliateInput?:InputAffiliateCreate,employee?:InputEmployeeCreate, provider?:boolean): Promise<User >{

   if(affiliateInput || employee || provider){

      if(!(await this.findOne(dto.identification))){
	 const user:User= this.userRepository.create(dto)
	 const  queryRunner= this.dataSource.createQueryRunner() 
	 await queryRunner.connect()
	 await queryRunner.startTransaction()
	 try {
	 const queryUser:User =await queryRunner.manager.save(user)
	    if(affiliateInput){
	       await this.affiliateService.create(queryRunner,affiliateInput.inputAffiliate,queryUser,
		  affiliateInput.beneficiary.beneficiaries,affiliateInput.beneficiary.percentage);
	    }
	    if(employee){
	       await this.employeeService.create(employee,queryUser,queryRunner)
		  
	    }

	    if(provider){
	       await this.providerService.create(queryUser,queryRunner)
	    }
	    await queryRunner.commitTransaction()
	    return await this.findOne(user.identification)
	    

	 }catch(a){
	    console.log("Error transaccion",a)
	    await queryRunner.rollbackTransaction()
	 } finally{
	    await queryRunner.release()
	 }

      }
      }
      
   } 

   async findOne(identification:number): Promise<User | null>{
      const user:User=await this.userRepository.find({relations:{
      affiliate:true,
      },where:{
	    identification:identification,
      }}).then ((data)=>{
      if(data.length===0){
	 return null;
      }else {
	 return data[0];
      }
      });

      
      return user;
      
   }
}

