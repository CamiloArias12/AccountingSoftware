import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AffiliateService } from './affiliate.service';
import { Affiliate } from './affiliate.entity';
import { UpdateAfiliateDto } from './dto/updateAfiliate.dto';

@Resolver(() => Affiliate)
export class AffiliateResolver {
    constructor(
       private readonly afiliateService: AffiliateService,
    ) {}

/*
    @Mutation(() => Affiliate)
    async createAfiliateUserExist(@Args('inputAffiliate')inputAffiliate:CreateAfiliateDto ,@Args('idUser')identificationUser:number): Promise <Affiliate>{
	 let user:User=await this.userService.findOne(identificationUser)
	 
	 if(user){
	    return await  this.afiliateService.create(inputAffiliate,user)
	 }
	 
    }
*/
    @Query(() => [Affiliate])
    async allAfiliates(): Promise<Affiliate[]> {
        return await this.afiliateService.findAll();
    }
   
    @Query(() => Affiliate)
    async getAffiliate(@Args('identification') identification:number): Promise<Affiliate> {
        return await this.afiliateService.findOne(identification);
    }

    @Mutation(() => Affiliate)
    async updateAfiliate(
        @Args('id') id: number,
        @Args('input') input: UpdateAfiliateDto,
    ): Promise<Affiliate> {
        return await this.afiliateService.update(id, input);
    }
/*
    @Mutation(() => Boolean)
    async deleteAfiliate(@Args('id') id: number): Promise<boolean> {
        await this.afiliateService.remove(id);
        return true;
    }*/
}
