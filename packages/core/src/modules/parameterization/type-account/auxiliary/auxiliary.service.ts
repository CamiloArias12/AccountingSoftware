import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Auxiliary } from './auxiliary.entity';
import { TypeAccount } from '../type-account.entity';
import { SubAccount } from '../sub-account/sub-account.entity';

@Injectable()
export class AuxiliaryService {
    constructor(
        @InjectRepository(Auxiliary)
        private readonly auxiliaryRepository: Repository<Auxiliary>,
    ) { }

    async create(typeAccount:TypeAccount, subAccount:SubAccount): Promise<Auxiliary> {

	    const auxiliary: Auxiliary= new Auxiliary();
	    auxiliary.typeAccount = typeAccount;
	    auxiliary.subAccount= subAccount;

	    return await this.auxiliaryRepository.save(auxiliary);
    }


    async findAll(): Promise<Auxiliary[]> {
        return await this.auxiliaryRepository.find(
	 {relations:{
	    typeAccount:true
	 }}

	);
    }

    async findOne(code: number): Promise<Auxiliary> {
        const auxiliary = await this.auxiliaryRepository.findOne({
            where: {
                code,
            },
        });
        if (!auxiliary) {
            throw new NotFoundException(`Auxiliary with code ${code} not found`);
        }
        return auxiliary;
    }


    async findAuxiliarys(codes: number[]): Promise<Auxiliary[]> {
        return await this.auxiliaryRepository.find(
            {
	       where: { code: In(codes) } }
        );
    }

   async findBySubAccount(code:number): Promise<Auxiliary[]> {
        return await this.auxiliaryRepository.find({
	     relations:{
		  typeAccount:true
	  	  },
	     where:{
		  subAccount:{
		     code:code,
		  }
	     }
	 }
	);
      }


    }

