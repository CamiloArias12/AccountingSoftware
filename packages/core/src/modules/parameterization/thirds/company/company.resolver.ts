import { Resolver, Query, Int, Mutation, Args } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/input/createCompany.dto';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Boolean)
  async createCompany(
    @Args('input') input: CreateCompanyDto,
  ): Promise<Boolean> {
    return await this.companyService.create(input);
  }
  @Mutation(() => Boolean)
  async updateCompany(
    @Args('data') data: CreateCompanyDto,
    @Args('id') identification: number,
  ): Promise<Boolean> {
    return await this.companyService.update(identification, data);
  }
  @Query(() => Int)
  async totalThirdsCompany() {
    return await this.companyService.count();
  }

  @Query(() => [Company])
  async allCompanies(): Promise<Company[]> {
    return await this.companyService.findAll();
  }

  @Query(() => Company)
  async company(
    @Args('numberIdentification') numberIdentification: number,
  ): Promise<Company> {
    return await this.companyService.findOne(numberIdentification);
  }

  @Mutation(() => Boolean)
  async deleteCompany(
    @Args('identification') numberIdentification: number,
  ): Promise<Boolean> {
    return await this.companyService.delete(numberIdentification);
  }
}
