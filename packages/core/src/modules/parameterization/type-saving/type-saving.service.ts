import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeSaving } from './type-saving.entity';
import { CreateTypeSavingDto } from './dto/createTypeSaving.dto';
import { SubAccountService } from '../type-account/sub-account/sub-account.service';
import { AccountService } from '../type-account/account/account.service';
import { AuxiliaryService } from '../type-account/auxiliary/auxiliary.service';
import { UpdateTypeSavingDto } from './dto/updateTypeSaving.dto';

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

    async updateOrCreateTypeSaving(data: UpdateTypeSavingDto): Promise<TypeSaving> {
        let typeSaving = await this.typeSavingRepository.findOne({
            where: { id: data.id}
        });

        if (!typeSaving) {
            typeSaving = new TypeSaving();
            typeSaving.id= data.id;
        }

        if (data.auxiliary && data.auxiliary.length) {
            typeSaving.auxiliarys = await this.auxiliaryService.findAuxiliarys(data.auxiliary);
        }

        typeSaving.name = data.name;

        return await this.typeSavingRepository.save(typeSaving);
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
}


