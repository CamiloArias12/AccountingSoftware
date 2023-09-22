import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InstallmentsService } from './installments.service';
import { Installment } from './entities/installment.entity';
import { CreateInstallmentInput } from './dto/create-installment.input';
import { UpdateInstallmentInput } from './dto/update-installment.input';

@Resolver(() => Installment)
export class InstallmentsResolver {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Mutation(() => Installment)
  createInstallment(@Args('createInstallmentInput') createInstallmentInput: CreateInstallmentInput) {
    return this.installmentsService.create(createInstallmentInput);
  }

  @Query(() => [Installment], { name: 'installments' })
  findAll() {
    return this.installmentsService.findAll();
  }

  @Query(() => Installment, { name: 'installment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.installmentsService.findOne(id);
  }

  @Mutation(() => Installment)
  updateInstallment(@Args('updateInstallmentInput') updateInstallmentInput: UpdateInstallmentInput) {
    return this.installmentsService.update(updateInstallmentInput.id, updateInstallmentInput);
  }

  @Mutation(() => Installment)
  removeInstallment(@Args('id', { type: () => Int }) id: number) {
    return this.installmentsService.remove(id);
  }
}
