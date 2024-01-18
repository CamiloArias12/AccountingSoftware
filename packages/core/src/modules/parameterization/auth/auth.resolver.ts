import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Employee } from '../thirds/employee/employee.entity';
import { Token } from './dto/payload';
import { Public } from './auth.guards';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Mutation(() => Token)
  async authUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<Token> {
    return this.authService.singIn(username, password);
  }
}
