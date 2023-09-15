import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/input/createCompany.dto';
import { UpdateCompanyDto } from './dto/input/updateCompany.dto';
export declare class CompanyService {
    private readonly companyRepository;
    constructor(companyRepository: Repository<Company>);
    create(createCompanyDto: CreateCompanyDto): Promise<Company>;
    findAll(): Promise<Company[]>;
    findOne(numberIdentification: number): Promise<Company>;
    update(numberIdentification: number, updateCompanyDto: UpdateCompanyDto): Promise<Company>;
    remove(numberIdentification: number): Promise<void>;
}
