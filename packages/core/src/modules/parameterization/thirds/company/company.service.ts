import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/input/createCompany.dto';


@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<Boolean> {
      try {
         const company = this.companyRepository.create(createCompanyDto as Company);
	 await this.companyRepository.save(company);
	 return true; 
      } catch (e) {
	 console.log(e)
	 return false;
      }
            

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

   
    async remove(numberIdentification: number): Promise<void> {
        const company = await this.findOne(numberIdentification);
        await this.companyRepository.remove(company);
    }
}

