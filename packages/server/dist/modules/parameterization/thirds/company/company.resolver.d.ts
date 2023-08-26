import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/input/createCompany.dto';
import { UpdateCompanyDto } from './dto/input/updateCompany.dto';
export declare class CompanyResolver {
    private readonly companyService;
    constructor(companyService: CompanyService);
    createCompany(input: CreateCompanyDto): Promise<Company>;
    allCompanies(): Promise<Company[]>;
    company(numberIdentification: number): Promise<Company>;
    updateCompany(numberIdentification: number, input: UpdateCompanyDto): Promise<Company>;
    deleteCompany(numberIdentification: number): Promise<boolean>;
}
