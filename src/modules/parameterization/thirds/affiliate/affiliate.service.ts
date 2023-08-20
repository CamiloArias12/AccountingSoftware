import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Afiliate } from './affiliate.entity';
import { CreateAfiliateDto } from './dto/createAfiliate.dto';
import { UpdateAfiliateDto } from './dto/updateAfiliate.dto';


@Injectable()
export class AfiliateService {
    constructor(
        @InjectRepository(Afiliate)
        private readonly afiliateRepository: Repository<Afiliate>,
    ) {}

    async create(dto: CreateAfiliateDto): Promise<Afiliate> {
        const afiliate = this.afiliateRepository.create(dto);
        return await this.afiliateRepository.save(afiliate);
    }

    async findAll(): Promise<Afiliate[]> {
        return await this.afiliateRepository.find();
    }

    async findOne(numberAccount: number): Promise<Afiliate> {
        const afiliate = await this.afiliateRepository.findOne({
            where: {
                numberAccount,
            },
        });
        if (!afiliate) {
            throw new NotFoundException(`Afiliado con ID ${numberAccount} no encontrado`);
        }
        return afiliate;
    }

    async update(numberAccount: number, updateDto: UpdateAfiliateDto): Promise<Afiliate> {
        const afiliate = await this.afiliateRepository.preload({ numberAccount, ...updateDto });
        if (!afiliate) {
            throw new NotFoundException(`Afiliado con ID ${numberAccount} no encontrado`);
        }
        return await this.afiliateRepository.save(afiliate);
    }

    async remove(id: number): Promise<void> {
        const afiliate = await this.findOne(id);
        await this.afiliateRepository.remove(afiliate);
    }
}
