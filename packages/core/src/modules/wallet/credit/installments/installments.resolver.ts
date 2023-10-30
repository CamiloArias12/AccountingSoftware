import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Installment } from './installment.entity';
import { InstallmentsService } from './installments.service';
import { InstallmentPayment } from './dto/types';
@Resolver(() => Installment)
export class InstallmentResolver {
  constructor(private readonly installmentService: InstallmentsService) { }

  @Mutation(() => [InstallmentPayment])
  async getAllInstallments(@Args("date") date:Date): Promise<InstallmentPayment[]> {
    return await this.installmentService.findAll(date);
  }

 }
