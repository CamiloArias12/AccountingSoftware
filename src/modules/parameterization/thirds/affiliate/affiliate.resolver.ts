import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AfiliateService } from './affiliate.service';
import { Afiliate } from './affiliate.entity';
import { UpdateAfiliateDto } from './dto/updateAfiliate.dto';
import { CreateAfiliateDto } from './dto/createAfiliate.dto';


@Resolver(() => Afiliate)
export class AfiliateResolver {
    constructor(private readonly afiliateService: AfiliateService) {}

    @Mutation(() => Afiliate)
    async createAfiliate(@Args('input') input: CreateAfiliateDto): Promise<Afiliate> {
        return await this.afiliateService.create(input);
    }

    @Query(() => [Afiliate])
    async allAfiliates(): Promise<Afiliate[]> {
        return await this.afiliateService.findAll();
    }

    @Query(() => Afiliate, { nullable: true })
    async afiliate(@Args('id') id: number): Promise<Afiliate> {
        return await this.afiliateService.findOne(id);
    }

    @Mutation(() => Afiliate)
    async updateAfiliate(
        @Args('id') id: number,
        @Args('input') input: UpdateAfiliateDto,
    ): Promise<Afiliate> {
        return await this.afiliateService.update(id, input);
    }

    @Mutation(() => Boolean)
    async deleteAfiliate(@Args('id') id: number): Promise<boolean> {
        await this.afiliateService.remove(id);
        return true;
    }
}
