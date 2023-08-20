import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beneficiary } from './beneficiary.entity';
import { CreateBeneficiaryDto } from './dto/createBeneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/updateBeneficiary.dto';


@Injectable()
export class BeneficiaryService {
    constructor(
        @InjectRepository(Beneficiary)
        private readonly beneficiaryRepository: Repository<Beneficiary>,
    ) {}

    async create(dto: CreateBeneficiaryDto): Promise<Beneficiary> {
        const beneficiary = this.beneficiaryRepository.create(dto);
        return await this.beneficiaryRepository.save(beneficiary);
    }

    async findAll(): Promise<Beneficiary[]> {
        return await this.beneficiaryRepository.find();
    }

    async findOne(idDocument: number): Promise<Beneficiary> {
        const beneficiary = await this.beneficiaryRepository.findOne({
            where: {
                idDocument,
            },
        });
        if (!beneficiary) {
            throw new NotFoundException(`Beneficiary with ID ${idDocument} not found`);
        }
        return beneficiary;
    }

    async update(idDocument: number, updateDto: UpdateBeneficiaryDto): Promise<Beneficiary> {
        const beneficiary = await this.beneficiaryRepository.preload({ idDocument, ...updateDto });
        if (!beneficiary) {
            throw new NotFoundException(`Beneficiary with ID ${idDocument} not found`);
        }
        return await this.beneficiaryRepository.save(beneficiary);
    }

    async remove(id: number): Promise<void> {
        const beneficiary = await this.findOne(id);
        await this.beneficiaryRepository.remove(beneficiary);
    }
}
