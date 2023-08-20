import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/input/createCompany.dto';
import { UpdateCompanyDto } from './dto/input/updateCompany.dto';


@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const company = this.companyRepository.create(createCompanyDto);
        return await this.companyRepository.save(company);
    }

    async findAll(): Promise<Company[]> {
        return await this.companyRepository.find();
    }

    async findOne(numberIdentification: number): Promise<Company> {
        const company = await this.companyRepository.findOne({
            where: {
                numberIdentification,
            },
        });
        if (!company) {
            throw new NotFoundException(`Empresa con número de identificación ${numberIdentification} no encontrada`);
        }
        return company;
    }    

    async update(numberIdentification: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
        const company = await this.companyRepository.preload({
            numberIdentification: numberIdentification,
            ...updateCompanyDto,
        });
        if (!company) {
            throw new NotFoundException(`Company with ID ${numberIdentification} not found`);
        }
        return await this.companyRepository.save(company);
    }

    async remove(numberIdentification: number): Promise<void> {
        const company = await this.findOne(numberIdentification);
        await this.companyRepository.remove(company);
    }
}

