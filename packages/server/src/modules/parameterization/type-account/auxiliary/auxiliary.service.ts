import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auxiliary } from './auxiliary.entity';
import { CreateAuxiliaryDto } from './dto/createAuxiliary.dto';
import { UpdateAuxiliaryDto } from './dto/updateAuxiliary.dto';
import { TypeAccountService } from '../type-account.service';
import { TypeAccount } from '../type-account.entity';

@Injectable()
export class AuxiliaryService {
    constructor(
        @InjectRepository(Auxiliary)
        private readonly auxiliaryRepository: Repository<Auxiliary>,
        private readonly typeAccountService: TypeAccountService
    ) { }

    async create(createAuxiliaryDto: CreateAuxiliaryDto): Promise<Auxiliary> {
        const typeAccount: TypeAccount = await this.typeAccountService.create(createAuxiliaryDto);
        if (typeAccount) {
            const auxiliary: Auxiliary = new Auxiliary();
            auxiliary.typeAccount = typeAccount;
            return await this.auxiliaryRepository.save(auxiliary);
        }
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

    async update(code: number, updateAuxiliaryDto: UpdateAuxiliaryDto): Promise<Auxiliary> {
        const auxiliary = await this.auxiliaryRepository.preload({
            code: code,
            ...updateAuxiliaryDto,
        });
        if (!auxiliary) {
            throw new NotFoundException(`Auxiliary with code ${code} not found`);
        }
        return await this.auxiliaryRepository.save(auxiliary);
    }

    async remove(code: number): Promise<void> {
        const auxiliary = await this.findOne(code);
        await this.auxiliaryRepository.remove(auxiliary);
    }
}

