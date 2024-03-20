import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AffiliateService } from './affiliate.service';
import { Affiliate } from './affiliate.entity';
import { UpdateAfiliateDto } from './dto/updateAfiliate.dto';

@Resolver(() => Affiliate)
export class AffiliateResolver {
  constructor(private readonly afiliateService: AffiliateService) {}

  @Query(() => [Affiliate])
  async allAfiliates(): Promise<Affiliate[]> {
    return await this.afiliateService.findAll();
  }

  @Query(() => Int)
  async totalAffiliates(): Promise<number> {
    return await this.afiliateService.count();
  }

  @Query(() => Affiliate)
  async getAffiliate(
    @Args('identification') identification: number,
  ): Promise<Affiliate> {
    return await this.afiliateService.findOne(identification);
  }
}
