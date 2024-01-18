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
      const company = this.companyRepository.create(
        createCompanyDto as Company,
      );
      await this.companyRepository.save(company);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async count(): Promise<Number> {
    return await this.companyRepository.count();
  }
  async update(
    identification: number,
    data: CreateCompanyDto,
  ): Promise<Boolean> {
    try {
      await this.companyRepository.update(identification, { ...data });
      return true;
    } catch (e) {
      /* handle error */
      return false;
    }
  }

  async findOne(identification: number): Promise<Company> {
    return await this.companyRepository.findOne({
      where: {
        identification,
      },
    });
  }

  async delete(numberIdentification: number): Promise<Boolean> {
    try {
      await this.companyRepository.delete(numberIdentification);
      return true;
    } catch (e) {
      console.log(e);
      return false;
      /* handle error */
    }
  }
}
