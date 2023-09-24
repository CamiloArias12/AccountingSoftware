import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InstallmentsService } from './installments.service';
import { CreateInstallmentInput } from './dto/create-installment.input';
import { UpdateInstallmentInput } from './dto/update-installment.input';
import { Installment } from './installment.entity';

@Resolver(() => Installment)
export class InstallmentsResolver {
  constructor(private readonly installmentsService: InstallmentsService) { }

  @Mutation(() => Installment)
  async createInstallment(
    @Args('createInstallmentInput') createInstallmentInput: CreateInstallmentInput
  ): Promise<Installment> {
    return this.installmentsService.create(createInstallmentInput);
  }

  @Query(() => [Installment], { name: 'installments' })
  async findAll(): Promise<Installment[]> {
    return this.installmentsService.findAll();
  }

  @Query(() => Installment, { name: 'installment' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Installment> {
    return this.installmentsService.findOne(id);
  }

  @Mutation(() => Installment)
  async updateInstallment(
    @Args('updateInstallmentInput') updateInstallmentInput: UpdateInstallmentInput
  ): Promise<Installment> {
    return this.installmentsService.update(updateInstallmentInput.id, updateInstallmentInput);
  }

  @Mutation(() => Installment)
  async removeInstallment(@Args('id', { type: () => Int }) id: number): Promise<Installment> {
    return this.installmentsService.remove(id);
  }
}

