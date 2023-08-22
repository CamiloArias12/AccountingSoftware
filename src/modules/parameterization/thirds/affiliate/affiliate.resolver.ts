import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AffiliateService } from './affiliate.service';
import { Affiliate } from './affiliate.entity';
import { UpdateAfiliateDto } from './dto/updateAfiliate.dto';
import { CreateAfiliateDto } from './dto/createAfiliate.dto';
import { CreateUser } from '../user/dto/input/createuser.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';


@Resolver(() => Affiliate)
export class AffiliateResolver {
    constructor(
       private readonly afiliateService: AffiliateService,
       private  readonly userService :UserService
    ) {}

    @Mutation(() => Affiliate)
    async createAfiliate(@Args('inputAffiliate') inputAffiliate: CreateAfiliateDto, @Args('inputUser') inputUser:CreateUser ): Promise<Affiliate> {

	  let user:User =await this.userService.createUser(inputUser)
        return await this.afiliateService.create(inputAffiliate,user);
    }
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

    @Query(() => User)
    async afiliate(@Args('id') id: number): Promise<User> {
        return await this.userService.findOne(id);
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
