import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BeneficiaryService } from './beneficiary.service';
import { Beneficiary } from './beneficiary.entity';
import { UpdateBeneficiaryDto } from './dto/updateBeneficiary.dto';
import { CreateBeneficiaryDto } from './dto/createBeneficiary.dto';

@Resolver(() => Beneficiary)
export class BeneficiaryResolver {
    constructor(private readonly beneficiaryService: BeneficiaryService) {}

    @Mutation(() => Beneficiary)
    async createBeneficiary(@Args('input') input: CreateBeneficiaryDto): Promise<Beneficiary> {
        return await this.beneficiaryService.create(input);
    }

    @Query(() => [Beneficiary])
    async allBeneficiaries(): Promise<Beneficiary[]> {
        return await this.beneficiaryService.findAll();
    }

    @Query(() => Beneficiary, { nullable: true })
    async beneficiary(@Args('id') id: number): Promise<Beneficiary> {
        return await this.beneficiaryService.findOne(id);
    }

    @Mutation(() => Beneficiary)
    async updateBeneficiary(
        @Args('id') id: number,
        @Args('input') input: UpdateBeneficiaryDto,
    ): Promise<Beneficiary> {
        return await this.beneficiaryService.update(id, input);
    }

    @Mutation(() => Boolean)
    async deleteBeneficiary(@Args('id') id: number): Promise<boolean> {
        await this.beneficiaryService.remove(id);
        return true;
    }
}
