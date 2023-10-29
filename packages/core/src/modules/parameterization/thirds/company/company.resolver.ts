import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/input/createCompany.dto';
import { UpdateCompanyDto } from './dto/input/updateCompany.dto';

@Resolver(() => Company)
export class CompanyResolver {
    constructor(private readonly companyService: CompanyService) {}

    @Mutation(() => Boolean)
    async createCompany(@Args('input') input: CreateCompanyDto): Promise<Boolean> {
        return await this.companyService.create(input);
    }

    @Query(() => [Company])
    async allCompanies(): Promise<Company[]> {
        return await this.companyService.findAll();
    }

    @Query(() => Company)
    async company(@Args('numberIdentification') numberIdentification: number): Promise<Company> {
        return await this.companyService.findOne(numberIdentification);
    }

  
    @Mutation(() => Boolean)
    async deleteCompany(@Args('numberIdentification') numberIdentification: number): Promise<boolean> {
        await this.companyService.remove(numberIdentification);
        return true;
    }
}

