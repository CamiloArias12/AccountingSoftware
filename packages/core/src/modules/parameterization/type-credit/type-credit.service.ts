import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeCredit } from './type-credit.entity';
import { CreateTypeCreditDto } from './dto/createTypeCredit.dto';
import { AuxiliaryService } from '../type-account/auxiliary/auxiliary.service';
import { UpdateTypeCreditInput } from './dto/updateTypeCredit.dto';


@Injectable()
export class TypeCreditService {
  constructor(
    @InjectRepository(TypeCredit)
    private readonly typeCreditRepository: Repository<TypeCredit>,
    private readonly auxiliaryService: AuxiliaryService
  ) { }

  async createTypeCredit(data: CreateTypeCreditDto): Promise<Boolean> {
    const typeCredit = new TypeCredit();
   
    if (data.auxiliary && data.auxiliary.length >=2) {
      typeCredit.auxiliarys = await this.auxiliaryService.findAuxiliarys(data.auxiliary); 
      typeCredit.name = data.name;
      typeCredit.interest= data.interest;
      return (await this.typeCreditRepository.save(typeCredit)) && true ;
    }else{
      return false
    }

  }

  async update(data: UpdateTypeCreditInput,id:number): Promise<Boolean> {
     try {
       await this.typeCreditRepository.update({id:id},{name:data.name,interest:data.interest}) 
       return true;
     } catch (e) {
	return false
     }
  }

   async findAll(): Promise<TypeCredit[]> {
        return await this.typeCreditRepository.find(
	    { relations :{
		  auxiliarys:{
		     typeAccount:true
		  } 
	       }

	    }
	);
    }
    async findOne(id:number):Promise<TypeCredit> {
      return await this.typeCreditRepository.findOne({
	 relations:{
	    auxiliarys:true
	 },
	 where:{id:id}});
    }
   async delete (id:number):Promise<Boolean> {
      try {
	 await this.typeCreditRepository.delete(id) 
	 return true;
      } catch (e) {
	 console.log(e)
	 return false
      }
   }


  
}

