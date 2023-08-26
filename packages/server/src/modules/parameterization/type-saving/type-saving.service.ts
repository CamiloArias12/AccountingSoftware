import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeSaving } from './type-saving.entity'; // Asegúrate de que el archivo y la clase se llaman TypeSaving
import { CreateTypeSavingDto } from './dto/createTypeSaving.dto';
import { UpdateTypeSavingDto } from './dto/updateTypeSaving.dto';

@Injectable()
export class TypeSavingService {
    constructor(
        @InjectRepository(TypeSaving)
        private readonly typeSavingRepository: Repository<TypeSaving>,
    ) { }

    async create(createTypeSavingDto: CreateTypeSavingDto): Promise<TypeSaving> {
        const typeSaving = this.typeSavingRepository.create(createTypeSavingDto);
        return await this.typeSavingRepository.save(typeSaving);
    }

    async findAll(): Promise<TypeSaving[]> {
        return await this.typeSavingRepository.find();
    }

    async findOne(id: number): Promise<TypeSaving> {
        const typeSaving = await this.typeSavingRepository.findOne({
            where: {
                id,
            },
        });
        if (!typeSaving) {
            throw new NotFoundException(`TypeSaving with ID ${id} not found`);
        }
        return typeSaving;
    }

    async update(id: number, updateTypeSavingDto: UpdateTypeSavingDto): Promise<TypeSaving> {
        const typeSaving = await this.typeSavingRepository.preload({
            id: id,
            ...updateTypeSavingDto,
        });
        if (!typeSaving) {
            throw new NotFoundException(`TypeSaving with ID ${id} not found`);
        }
        return await this.typeSavingRepository.save(typeSaving);
    }

    async remove(id: number): Promise<void> {
        const typeSaving = await this.findOne(id);
        await this.typeSavingRepository.remove(typeSaving);
    }
}

