import { Resolver, Query, Mutation, Args,Int } from '@nestjs/graphql';
import { TypeAccount } from './type-account.entity';
import { TypeAccountService } from './type-account.service';
import { TypeAccountEnum } from './dto/enum-type';
import { TypeAccountInput } from './dto/type-account-input';
@Resolver(() => TypeAccount)
export class TypeAccountResolver {
    constructor(private readonly typeAccountService: TypeAccountService) { }

    @Mutation(() => Boolean)
    async createAccount(@Args('createTypeAccount') createAccountInput: TypeAccountInput,
			@Args('type',{nullable :true}) type?:TypeAccountEnum,
			@Args('referenceTypeAccount',{nullable:true}) code?:number
		       ): Promise<boolean> {
        return this.typeAccountService.create(createAccountInput,type,code);
    }
   
    @Query(() => [TypeAccount])
    async allTypeAccount ():Promise<TypeAccount[]>{
       return this.typeAccountService.findAll();
    }
   @Mutation(()=>Boolean)
   async deleteAccount(@Args('code', { type: () => Int }) identification: number) {
      return this.typeAccountService.delete(identification)
   }

   @Mutation(() => Boolean)
   async updateStatusAccount(@Args('code',) code:number,
		     @Args('status') status:boolean
		       ): Promise<Boolean> {
        return this.typeAccountService.updateStatus(code,status);
    }

   @Mutation(() => Boolean)
   async updateAccount(@Args('updateTypeAccount') updateDto: TypeAccountInput,
			@Args('code',) code:number
		       ): Promise<Boolean> {
        return this.typeAccountService.update(code,updateDto);
    }

}

