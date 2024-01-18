import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserInput } from './dto/input/createuser.dto';
import { InputAffiliateCreate } from '../affiliate/dto/InputAffiliate';
import { InputEmployeeCreate } from '../employee/dto/createEmployee.dto';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guards';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  private sleep = async (milliseconds) => {
    await new Promise((resolve) => {
      return setTimeout(resolve, milliseconds);
    });
  };

  @Mutation(() => ResponseGraphql)
  async createUser(
    @Args('createUserInput') userInput: UserInput,
    @Args('createAffiiate', { nullable: true })
    affiliate?: InputAffiliateCreate,
    @Args('createEmployee', { nullable: true }) employee?: InputEmployeeCreate,
    @Args('createProvider', { nullable: true }) provider?: boolean,
  ) {
    return await this.userService.create(
      userInput,
      affiliate,
      employee,
      provider,
    );
  }
  @Mutation(() => ResponseGraphql)
  async updateUser(
    @Args('identification') identification: number,
    @Args('createUserInput') userInput: UserInput,
    @Args('createAffiiate', { nullable: true })
    affiliate?: InputAffiliateCreate,
    @Args('createEmployee', { nullable: true }) employee?: InputEmployeeCreate,
    @Args('createProvider', { nullable: true }) provider?: boolean,
  ) {
    return await this.userService.update(
      identification,
      userInput,
      affiliate,
      employee,
      provider,
    );
  }

  @Query(() => User, { name: 'getUser' })
  async findOne(@Args('id') id: number) {
    console.log('Get  users', id);
    return await this.userService.findOne(id);
  }
  @Query(() => Int)
  async totalThirdsNatural() {
    return await this.userService.count();
  }

  @Query(() => [User], { name: 'getAllUsers' })
  async findAll() {
    console.log('Get all');

    return await this.userService.findUsers();
  }

  @Mutation(() => User, { name: 'updateStatus' })
  async updateStatus(
    @Args('identification') id: number,
    @Args('status') status: boolean,
  ) {
    console.log('Get  users', id);
    return await this.userService.changeStatus(id, status);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('identification') identification: number) {
    return this.userService.delete(identification);
  }
}
