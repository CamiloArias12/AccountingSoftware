import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeCredit } from './type-credit.entity'; // Asumo que el archivo y la clase se llaman TypeCredit ahora
import { CreateTypeCreditDto } from './dto/createTypeCredit.dto';
import { UpdateTypeCreditDto } from './dto/updateTypeCredit.dto';


@Injectable()
export class TypeCreditService {
    constructor(
        @InjectRepository(TypeCredit)
        private readonly typeCreditRepository: Repository<TypeCredit>,
    ) { }

    async create(createTypeCreditDto: CreateTypeCreditDto): Promise<TypeCredit> {
        const typeCredit = this.typeCreditRepository.create(createTypeCreditDto);
        return await this.typeCreditRepository.save(typeCredit);
    }

    async findAll(): Promise<TypeCredit[]> {
        return await this.typeCreditRepository.find();
    }

    async findOne(id: number): Promise<TypeCredit> {
        const typeCredit = await this.typeCreditRepository.findOne({
            where: {
                id,
            },
        });
        if (!typeCredit) {
            throw new NotFoundException(`TypeCredit with ID ${id} not found`);
        }
        return typeCredit;
    }

    async update(id: number, updateTypeCreditDto: UpdateTypeCreditDto): Promise<TypeCredit> {
        const typeCredit = await this.typeCreditRepository.preload({
            id: id,
            ...updateTypeCreditDto,
        });
        if (!typeCredit) {
            throw new NotFoundException(`TypeCredit with ID ${id} not found`);
        }
        return await this.typeCreditRepository.save(typeCredit);
    }

    async remove(id: number): Promise<void> {
        const typeCredit = await this.findOne(id);
        await this.typeCreditRepository.remove(typeCredit);
    }
}

