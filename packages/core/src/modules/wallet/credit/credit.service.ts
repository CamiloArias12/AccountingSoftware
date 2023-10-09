import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credit } from './credit.entity';
import { CreateCreditInput } from './dto/create-credit.input';
import { UpdateCreditInput } from './dto/update-credit.input';
import { AmortizationTable, AmortizationTableChange} from './installments/dto/types';
import { addMonths } from 'date-fns';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
  ) { }

  async create(createCreditInput: CreateCreditInput): Promise<Credit> {
    createCreditInput.startDate = new Date(createCreditInput.startDate.toISOString().split('T')[0]);
    const newCredit = this.creditRepository.create(createCreditInput);
    return this.creditRepository.save(newCredit);
  }

  async findAll(): Promise<Credit[]> {
     this.amortizationTableGenerate(new Date(),10000000,1.4,9)
    return this.creditRepository.find();
  }

  async findOne(id: number): Promise<Credit> {
    return this.creditRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateCreditInput: UpdateCreditInput): Promise<Credit> {
    if (updateCreditInput.startDate) {
      const date = new Date(updateCreditInput.startDate);
      updateCreditInput.startDate = new Date(date.toISOString().split('T')[0]);
    }
    
    const existingCredit = await this.creditRepository.preload({ id, ...updateCreditInput });
    if (!existingCredit) {
      throw new Error('Credit not found');
    }
    return this.creditRepository.save(existingCredit);
  }

  async remove(id: number): Promise<void> {
    await this.creditRepository.delete(id);
  }

  async amortizationTableGenerate(dateCredit:Date,valueLoan:number,interest:number,installments:number):Promise<AmortizationTable[]>{
     const array:AmortizationTable[]=[]
     let loanPartial=valueLoan
     const valueInstallment=this.pmt(valueLoan,((interest*(12/100))*100),installments)
    for (let i = 0; i < installments; i++) {
       const interestValue=loanPartial*(0.014)
       const finalBalance=loanPartial-(valueInstallment-interestValue)

       array.push({numberInstallment:i+1,date:addMonths( dateCredit,i+1),loanInitial:Math.round(loanPartial),
		  loanProgramer:Math.round(valueInstallment),loanExtra:0,loanTotal:Math.round(valueInstallment),
		  capital:Math.round(valueInstallment-interestValue),
		  interest:Math.round(interestValue),finalBalance:Math.round(finalBalance)})

	 loanPartial=loanPartial-(valueInstallment-interestValue)
    }
     return array;
  }


  async amortizationTableChange(array:AmortizationTableChange[]):Promise<AmortizationTable[]>{
      const arrayFinal:AmortizationTable[]=[]
      let loanInitial=array[0].loanInitial 
      let interestValue=loanInitial*(0.014)
      console.log(array.length,"size array")
      for (let i = 0; i < array.length; i++) {
         
	 arrayFinal.push({numberInstallment:i+1,date:array[i].date,loanInitial:Math.round(loanInitial),
			   loanProgramer:Math.round(array[i].loanProgramer),loanExtra:Math.round(array[i].loanExtra),
			   loanTotal:Math.round((array[i].loanProgramer+array[i].loanExtra)),
			   capital:Math.round(((array[i].loanProgramer+array[i].loanExtra)-interestValue)),
			   interest:Math.round(interestValue),
			   finalBalance:Math.round(loanInitial-((array[i].loanProgramer+array[i].loanExtra)-interestValue))})
	 loanInitial=arrayFinal[i].finalBalance
	 interestValue=loanInitial*(0.014)
	 if(loanInitial<arrayFinal[i].loanProgramer&& loanInitial!==0 && i<(array.length-2) ){
	    arrayFinal.push({numberInstallment:i+2,date:array[i+2].date,loanInitial:Math.round(loanInitial),
			   loanProgramer:Math.round(loanInitial),loanExtra:0,
			   loanTotal:Math.round(loanInitial),capital:Math.round(loanInitial-interestValue),
			   interest:Math.round(interestValue),finalBalance:0})
	       break
   
	 }
	 if(loanInitial<arrayFinal[i].loanProgramer&& loanInitial!==0 && i===array.length-2 ){
	    arrayFinal.push({numberInstallment:i+1,date:array[i].date,loanInitial:Math.round(loanInitial),loanProgramer:Math.round(loanInitial),
		      loanExtra:0,loanTotal:Math.round(loanInitial),capital:Math.round(loanInitial-interestValue),interest:Math.round(interestValue),
		      finalBalance:0})

	       break
   
	 }

      }
      console.log("array",arrayFinal)
      return arrayFinal;
   }

   pmt(principal: number, interestRate: number, numberOfPayments: number): number {
      const monthlyInterestRate = interestRate /( 12*100);
      const presentValueFactor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
      return principal * monthlyInterestRate * presentValueFactor / (presentValueFactor - 1);
   }
}

