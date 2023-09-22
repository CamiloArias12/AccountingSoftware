import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Auxiliary } from './auxiliary.entity';
import { CreateAuxiliaryDto } from './dto/createAuxiliary.dto';
import { UpdateAuxiliaryDto } from './dto/updateAuxiliary.dto';
import { TypeAccountService } from '../type-account.service';
import { TypeAccount } from '../type-account.entity';
import { SubAccount } from '../sub-account/sub-account.entity';

@Injectable()
export class AuxiliaryService {
    constructor(
        @InjectRepository(Auxiliary)
        private readonly auxiliaryRepository: Repository<Auxiliary>,
        private readonly typeAccountService: TypeAccountService,
        @InjectRepository(SubAccount)
        private readonly subAccountRepository: Repository<SubAccount>
    ) { }


    async create(createAuxiliaryDto: CreateAuxiliaryDto): Promise<Auxiliary> {
        const subAccount = await this.subAccountRepository.findOne({ where: { code: createAuxiliaryDto.subAccountCode } });

        if (!subAccount) {
            throw new NotFoundException(`SubAccount con id ${createAuxiliaryDto.subAccountCode} no encontrado`);
        }

        const typeAccount: TypeAccount = await this.typeAccountService.create(createAuxiliaryDto);
        if (!typeAccount) {
            throw new NotFoundException(`No se pudo crear TypeAccount`);
        }

        const auxiliary: Auxiliary = new Auxiliary();
        auxiliary.typeAccount = typeAccount;
        auxiliary.subAccount = subAccount;

        return await this.auxiliaryRepository.save(auxiliary);
    }

    async findAll(): Promise<Auxiliary[]> {
        return await this.auxiliaryRepository.find();
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

    async findAuxiliary(codes: number[]): Promise<Auxiliary[]> {
        return await this.auxiliaryRepository.find(
            { where: { code: In(codes) } }
        );
    }

    async updateAuxiliaryAccount(code: number, updateData: UpdateAuxiliaryDto): Promise<Auxiliary> {
        if (this.findOne(code)) {
          const typeAccount: TypeAccount = new TypeAccount()
          console.log(typeAccount)
          return this.typeAccountService.update(code, typeAccount).then((typeAccount: TypeAccount) => {
            return this.findOne(typeAccount.code)
          })
    
        }
        return null
      }
}

