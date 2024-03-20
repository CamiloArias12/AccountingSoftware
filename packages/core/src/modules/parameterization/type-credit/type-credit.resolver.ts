import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { TypeCreditService } from './type-credit.service';
import { TypeCredit } from './type-credit.entity';
import { CreateTypeCreditDto } from './dto/createTypeCredit.dto';
import { UpdateTypeCreditInput } from './dto/updateTypeCredit.dto';

@Resolver(() => TypeCredit)
export class TypeCreditResolver {
  constructor(private readonly typeCreditService: TypeCreditService) {}

  @Mutation(() => Boolean)
  async createTypeCredit(
    @Args('data') createTypeCreditDto: CreateTypeCreditDto,
  ): Promise<Boolean> {
    return await this.typeCreditService.createTypeCredit(createTypeCreditDto);
  }

  @Mutation(() => Boolean)
  async updateTypeCredit(
    @Args('data') updateData: CreateTypeCreditDto,
    @Args('id') id: number,
  ): Promise<Boolean> {
    return await this.typeCreditService.update(updateData, id);
  }
  @Query(() => TypeCredit)
  async getTypeCredit(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TypeCredit> {
    return await this.typeCreditService.findOne(id);
  }

  @Query(() => [TypeCredit])
  async getTypeCreditAll(): Promise<TypeCredit[]> {
    return await this.typeCreditService.findAll();
  }

  @Mutation(() => Boolean)
  async deleteTypeCredit(@Args('id', { type: () => Int }) id: number) {
    return this.typeCreditService.delete(id);
  }
}
