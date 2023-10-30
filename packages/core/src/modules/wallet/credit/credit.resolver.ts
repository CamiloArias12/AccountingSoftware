import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreditService } from './credit.service';
import { CreateCreditInput } from './dto/create-credit.input';
import { Credit } from './credit.entity';
import { CreateInstallment} from './installments/dto/create-installment.input';
import { ChangeAmortization } from './installments/dto/types';
import { ViewCredit } from './credit-view.entity';
import { RefinanceCredit } from './dto/enum-types';

@Resolver(() => Credit)
export class CreditResolver {
  constructor(private readonly creditService: CreditService) { }

  @Mutation(() => Credit)
   async createCredit(@Args('createCreditInput') createCreditInput: CreateCreditInput
		     ) :Promise<Credit> {
    return this.creditService.create(createCreditInput);
  }

  @Query(() => [ViewCredit])
  async getAllCredit(): Promise<ViewCredit[]> {
    return await this.creditService.findAll();
  }

  @Query(() => Credit)
  async findOneCredit(@Args('id', { type: () => Int }) id: number) {
    return this.creditService.findOne(id);
  }

  @Mutation(() => Boolean)
  async isRefinance(@Args('id', { type: () => Int }) id: number) {
    return this.creditService.isRefinance(id);
  }

 @Query(() => RefinanceCredit)
  async refinanceCredit(@Args('id', { type: () => Int }) id: number):Promise<RefinanceCredit> {
    return this.creditService.refinance(id);
  }


  @Mutation(() => Boolean)
  async deleteCredit(@Args('id', { type: () => Int }) id: number) {
    return this.creditService.delete(id);
  }

 @Mutation(() => [CreateInstallment])
 async amortizationTableGenerate(
      @Args('Date', { type: () => Date }) date:Date ,
      @Args('creditValue') creditValue: number,
      @Args('interest',) interest:number,
      @Args('installments', { type: () => Int}) installments:number
  ):Promise<CreateInstallment[]> {
     console.log()
    return await this.creditService.amortizationTableGenerate(date,creditValue,interest,installments);
  }

 @Mutation(() => [CreateInstallment])
 async amortizationTableGenerateTwo(
      @Args('Date', { type: () => Date }) date:Date ,
      @Args('scheduledPayment') scheduledPayment: number,
      @Args('interest',) interest:number,
      @Args('installments', { type: () => Int}) installments:number
  ):Promise<CreateInstallment[]> {
    return await this.creditService.amortizationTableGenerateCaseTwo(scheduledPayment,date,installments,interest);
  }

@Mutation(() => [CreateInstallment])
 async amortizationTableGenerateThree(
      @Args('Date', { type: () => Date }) date:Date ,
      @Args('creditValue') creditValue: number,
      @Args('interest',) interest:number,
      @Args('scheduledPayment') scheduledPayment:number
  ):Promise<CreateInstallment[]> {
     console.log()
    return await this.creditService.amortizationTableGenerateThree(date,creditValue,interest,scheduledPayment);
  }


 @Mutation(() => [CreateInstallment])
 async amortizationTableChange(
	 @Args('tableAmortization') table:ChangeAmortization
	 ):Promise<CreateInstallment[]>{
	 console.log(table)
      return this.creditService.amortizationTableChange(table.tableAmortization); 
   }


}
