import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeSaving } from './type-saving.entity';
import { CreateTypeSavingDto } from './dto/createTypeSaving.dto';
import { SubAccountService } from '../type-account/sub-account/sub-account.service';
import { AccountService } from '../type-account/account/account.service';
import { AuxiliaryService } from '../type-account/auxiliary/auxiliary.service';
import { UpdateTypeCreditInput } from '../type-credit/dto/updateTypeCredit.dto';

@Injectable()
export class TypeSavingService {
    constructor(
        @InjectRepository(TypeSaving)
        private readonly typeSavingRepository: Repository<TypeSaving>,
        private readonly auxiliaryService: AuxiliaryService
    ) { }

    async createTypeSaving(data: CreateTypeSavingDto): Promise<TypeSaving> {
        const typeSaving = new TypeSaving();

        if (data.auxiliary && data.auxiliary.length) {
            typeSaving.auxiliarys = await this.auxiliaryService.findAuxiliarys(data.auxiliary);
        }

        typeSaving.name = data.name;

        return await this.typeSavingRepository.save(typeSaving);
    }
   async findOne(id:number):Promise<TypeSaving> {
      return await this.typeSavingRepository.findOne({where:{id:id}});
    }

   async update(data: UpdateTypeCreditInput,id:number): Promise<Boolean> {
     try {
       await this.typeSavingRepository.update({id:id},{name:data.name}) 
       return true;
     } catch (e) {
	return false
     }
  }
    async findAll(): Promise<TypeSaving[]> {
        return await this.typeSavingRepository.find(
	    {relations:{
	       auxiliarys:{
		     typeAccount:true
	       }
	 }}
	);
    }

   async delete (id:number):Promise<Boolean> {
      try {
	 await this.typeSavingRepository.delete(id) 
	 return true;
      } catch (e) {
	 console.log(e)
	 return false
      }
   }

}


