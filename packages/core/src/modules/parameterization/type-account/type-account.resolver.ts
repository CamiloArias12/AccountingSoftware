import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TypeAccount } from './type-account.entity';
import { TypeAccountService } from './type-account.service';
import { CreateTypeAccount} from './dto/createTypeAccount';
import { TypeAccountEnum } from './dto/enum-type';

@Resolver(() => TypeAccount)
export class TypeAccountResolver {
    constructor(private readonly typeAccountService: TypeAccountService) { }

    @Mutation(() => TypeAccount)
    async createAccount(@Args('createTypeAccount') createAccountInput: CreateTypeAccount,
			@Args('type',{nullable :true}) type?:TypeAccountEnum,
			@Args('referenceTypeAccount',{nullable:true}) code?:number

		       ): Promise<TypeAccount> {
        return this.typeAccountService.create(createAccountInput,type,code);
    }
   
    @Query(() => [TypeAccount])
    async allTypeAccount ():Promise<TypeAccount[]>{
       return this.typeAccountService.findAll();
    }

}

