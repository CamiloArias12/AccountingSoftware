import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeCredit } from './type-credit.entity';
import { CreateTypeCreditDto } from './dto/createTypeCredit.dto';
import { AuxiliaryService } from '../type-account/auxiliary/auxiliary.service';
import { UpdateTypeCreditDto } from './dto/updateTypeCredit.dto';


@Injectable()
export class TypeCreditService {
  constructor(
    @InjectRepository(TypeCredit)
    private readonly typeCreditRepository: Repository<TypeCredit>,
    private readonly auxiliaryService: AuxiliaryService
  ) { }

  async createTypeCredit(data: CreateTypeCreditDto): Promise<TypeCredit> {
    const typeCredit = new TypeCredit();

  

      if (data.auxiliary && data.auxiliary.length) {
      typeCredit.auxiliarys = await this.auxiliaryService.findAuxiliarys(data.auxiliary);
    }

    typeCredit.name = data.name;
    typeCredit.interest= data.interest;

    return await this.typeCreditRepository.save(typeCredit);
  }

  async updateOrCreateTypeCredit(data: UpdateTypeCreditDto): Promise<TypeCredit> {
    let typeCredit = await this.typeCreditRepository.findOne({
      where: { id: data.id}
    });

    if (!typeCredit) {
      typeCredit = new TypeCredit();
      typeCredit.id = data.id;
    }

    if (data.auxiliary && data.auxiliary.length) {
      typeCredit.auxiliarys = await this.auxiliaryService.findAuxiliarys(data.auxiliary);
    }

    typeCredit.name = data.name;
    typeCredit.interest= data.interest;

    return await this.typeCreditRepository.save(typeCredit);
  }

   async findAll(): Promise<TypeCredit[]> {
        return await this.typeCreditRepository.find();
    }

  
}



