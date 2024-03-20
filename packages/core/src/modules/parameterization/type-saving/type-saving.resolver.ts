import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { TypeSavingService } from './type-saving.service';
import { TypeSaving } from './type-saving.entity';
import { CreateTypeSavingDto } from './dto/createTypeSaving.dto';
import { UpdateTypeSavingInput } from './dto/updateTypeSaving.dto';

@Resolver(() => TypeSaving)
export class TypeSavingResolver {
  constructor(private readonly typeSavingService: TypeSavingService) {}

  @Mutation(() => TypeSaving)
  async createTypeSaving(
    @Args('data') createTypeSavingDto: CreateTypeSavingDto,
  ): Promise<TypeSaving> {
    return await this.typeSavingService.create(createTypeSavingDto);
  }

  @Mutation(() => Boolean)
  async updateTypeSaving(
    @Args('data') updateTypeSavingDto: CreateTypeSavingDto,
    @Args('id') id: number,
  ): Promise<Boolean> {
    return await this.typeSavingService.update(updateTypeSavingDto, id);
  }

  @Query(() => [TypeSaving])
  async getTypeSavingAll(): Promise<TypeSaving[]> {
    return await this.typeSavingService.findAll();
  }

  @Query(() => TypeSaving)
  async getTypeSaving(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TypeSaving> {
    return await this.typeSavingService.findOne(id);
  }

  @Mutation(() => Boolean)
  async deleteTypeSaving(@Args('id', { type: () => Int }) id: number) {
    return this.typeSavingService.delete(id);
  }
}
