import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { CreditService } from './credit.service';
import { CreateCreditInput } from './dto/create-credit.input';
import { Credit } from './credit.entity';
import { CreateInstallment } from './installments/dto/create-installment.input';
import { ChangeAmortization } from './installments/dto/types';
import { ViewCredit } from './credit-view.entity';
import { PaymentMethods, RefinanceCredit, StateCredit } from './dto/enum-types';
import { UpdateCreditInput } from './dto/update-credit.input';
import { CreditStatistics, CreditStatisticsGeneral } from './dto/types';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';

@Resolver(() => Credit)
export class CreditResolver {
  constructor(private readonly creditService: CreditService) {}

  @Mutation(() => Boolean)
  async createCredit(
    @Args('createCreditInput') createCreditInput: CreateCreditInput,
  ) {
    return this.creditService.create(createCreditInput);
  }

  @Mutation(() => Boolean)
  async refinanceCreditCreate(
    @Args('createCreditInput') createCreditInput: CreateCreditInput,
    @Args('id') id: number,
  ): Promise<Boolean> {
    return this.creditService.createRefinace(id, createCreditInput);
  }

  @Query(() => [ViewCredit])
  async getAllCredit(): Promise<ViewCredit[]> {
    return await this.creditService.findAll();
  }

  @Query(() => [[Float]])
  async getStatisticsCreditGeneral(): Promise<number[]> {
    return await this.creditService.countCreditByMonth();
  }

  @Query(() => CreditStatistics)
  async getStatisticsCredit(): Promise<CreditStatistics> {
    const statics: CreditStatistics = {
      total: await this.creditService.countAll(),
      total_value: await this.creditService.sumAll(),
      total_approved: await this.creditService.countAllByState(
        StateCredit.APROBADO,
      ),
      total_dibursed: await this.creditService.countAllByState(
        StateCredit.DESEMBOLSADO,
      ),
      total_progress: await this.creditService.countAllByState(
        StateCredit.CURSO,
      ),
      total_finalized: await this.creditService.countAllByState(
        StateCredit.FINALIZADO,
      ),
      total_refinanced: await this.creditService.countAllByState(
        StateCredit.REFINANCIADO,
      ),
    };
    return statics;
  }

  @Query(() => Credit)
  async findOneCredit(@Args('id', { type: () => Int }) id: number) {
    return this.creditService.findOne({
      relations: {
        affiliate: {
          user: true,
        },
        typeCredit: {
          auxiliaries: {
            account: true,
          },
        },
        installments: true,
      },
      where: { id: id },
      order: { installments: { installmentNumber: 'ASC' } },
    });
  }

  @Mutation(() => ResponseGraphql)
  async isRefinance(@Args('id', { type: () => Int }) id: number) {
    return this.creditService.isRefinance(id);
  }

  @Query(() => RefinanceCredit)
  async refinanceCredit(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<RefinanceCredit> {
    return this.creditService.refinance(id);
  }

  @Query(() => Float)
  async countCreditAfiliate(
    @Args('identifiation', { type: () => Float }) identification: number,
  ): Promise<number> {
    return this.creditService.countCreditAffiliate(identification);
  }

  @Query(() => Float)
  async totalCredits() {
    return this.creditService.countAll();
  }

  @Mutation(() => Boolean)
  async deleteCredit(@Args('id', { type: () => Int }) id: number) {
    return this.creditService.delete(id);
  }

  @Mutation(() => [CreateInstallment])
  async amortizationTableGenerate(
    @Args('dateCredit', { type: () => Date }) dateCredit: Date,
    @Args('datePayment', { type: () => Date, nullable: true })
    datePayment: Date,
    @Args('creditValue') creditValue: number,
    @Args('paymentMethod') paymentMethod: PaymentMethods,
    @Args('interest') interest: number,
    @Args('installments', { type: () => Int, nullable: true })
    installments: number,
  ): Promise<CreateInstallment[]> {
    console.log();
    return await this.creditService.amortizationTableGenerate(
      dateCredit,
      datePayment,
      creditValue,
      paymentMethod,
      interest,
      installments,
    );
  }

  @Mutation(() => [CreateInstallment])
  async amortizationTableGenerateTwo(
    @Args('Date', { type: () => Date }) date: Date,
    @Args('scheduledPayment') scheduledPayment: number,

    @Args('paymentMethod') paymentMethod: PaymentMethods,
    @Args('interest') interest: number,
    @Args('installments', { type: () => Int }) installments: number,
  ): Promise<CreateInstallment[]> {
    return await this.creditService.amortizationTableGenerateCaseTwo(
      scheduledPayment,
      date,
      installments,
      paymentMethod,
      interest,
    );
  }

  @Mutation(() => [CreateInstallment])
  async amortizationTableGenerateThree(
    @Args('Date', { type: () => Date }) date: Date,
    @Args('creditValue') creditValue: number,
    @Args('interest') interest: number,
    @Args('scheduledPayment') scheduledPayment: number,
    @Args('paymentMethod') paymentMethod: PaymentMethods,
  ): Promise<CreateInstallment[]> {
    console.log();
    return await this.creditService.amortizationTableGenerateThree(
      date,
      creditValue,
      interest,
      paymentMethod,
      scheduledPayment,
    );
  }

  @Mutation(() => [CreateInstallment])
  async amortizationTableChange(
    @Args('tableAmortization') table: ChangeAmortization,
  ): Promise<CreateInstallment[]> {
    return await this.creditService.amortizationTableChange(
      table.tableAmortization,
      1.4,
      PaymentMethods.monthly,
    );
  }

  @Mutation(() => [CreateInstallment])
  async amortizationTableChangeUpdate(
    @Args('tableAmortization') table: ChangeAmortization,
  ): Promise<CreateInstallment[]> {
    return await this.creditService.amortizationTableChangeUpdate(
      table.tableAmortization,
      1.4,
      PaymentMethods.monthly,
    );
  }

  @Mutation(() => Boolean)
  async updateCredit(@Args('data') data: UpdateCreditInput) {
    return await this.creditService.update(data);
  }
}
