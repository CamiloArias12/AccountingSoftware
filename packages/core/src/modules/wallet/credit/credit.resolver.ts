import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreditService } from './credit.service';
import { CreateCreditInput } from './dto/create-credit.input';
import { UpdateCreditInput } from './dto/update-credit.input';
import { Credit } from './credit.entity';
import { AmortizationTable, ChangeAmortization } from './installments/dto/types';

@Resolver(() => Credit)
export class CreditResolver {
  constructor(private readonly creditService: CreditService) { }

  @Mutation(() => Credit)
  createCredit(@Args('createCreditInput') createCreditInput: CreateCreditInput) {
    return this.creditService.create(createCreditInput);
  }

  @Query(() => [Credit])
  getAllCredit() {
    return this.creditService.findAll();
  }

  @Query(() => Credit)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.creditService.findOne(id);
  }

  @Mutation(() => Credit)
  async updateCredit(
    @Args('updateCreditInput') updateCreditInput: UpdateCreditInput
  ): Promise<Credit> {
    return this.creditService.update(updateCreditInput.id, updateCreditInput);
  }

  @Mutation(() => Credit)
  async removeCredit(@Args('id', { type: () => Int }) id: number) {
    return this.creditService.remove(id);
  }

 @Query(() => [AmortizationTable])
 async amortizationTableGenerate(
      @Args('Date', { type: () => Date }) date:Date ,
      @Args('creditValue') creditValue: number,
      @Args('interest',) interest:number,
      @Args('installments', { type: () => Int }) installments:number
  ):Promise<AmortizationTable[]> {
     console.log("Params",date,creditValue,interest,installments)
    return await this.creditService.amortizationTableGenerate(date,creditValue,interest,installments);
  }
 @Mutation(() => [AmortizationTable])
 async amortizationTableChange(
	 @Args('tableAmortization') table:ChangeAmortization
	 ):Promise<AmortizationTable[]>{
	 console.log(table)
      return this.creditService.amortizationTableChange(table.table); 
   }

}
