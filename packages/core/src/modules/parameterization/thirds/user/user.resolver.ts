import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserInput } from './dto/input/createuser.dto';
import { InputAffiliateCreate } from '../affiliate/dto/InputAffiliate';
import { InputEmployeeCreate } from '../employee/dto/createEmployee.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() =>User )
  async createUser(@Args('createUserInput') userInput:UserInput,
		   @Args('createAffiiate',{nullable:true}) affiliate?:InputAffiliateCreate,
		   @Args('createEmployee',{nullable:true}) employee?:InputEmployeeCreate,
		   @Args('createProvider',{nullable:true}) provider?:boolean
		  ) {
      return  await  this.userService.create(userInput,affiliate,employee,provider)
  }

  @Query(() => User, { name: 'credit' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

}
