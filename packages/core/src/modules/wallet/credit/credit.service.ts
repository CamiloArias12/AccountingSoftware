import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Credit } from './credit.entity';
import { addMonths } from 'date-fns';
import { CreateCreditInput } from './dto/create-credit.input';
import { CreateInstallment} from './installments/dto/create-installment.input';
import { AffiliateService } from 'src/modules/parameterization/thirds/affiliate/affiliate.service';
import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { TypeCredit } from 'src/modules/parameterization/type-credit/type-credit.entity';
import { TypeCreditService } from 'src/modules/parameterization/type-credit/type-credit.service';
import { ViewCredit } from './credit-view.entity';
import { RefinanceCredit, StateCredit } from './dto/enum-types';
import { User } from 'src/modules/parameterization/thirds/user/user.entity';
import { Installment } from './installments/installment.entity';
import { CreditAccount } from 'src/modules/treasury/credit-account/credit-account.entity';
import { StateInstallment } from './installments/dto/enum-types';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
    private affiliateService:AffiliateService,
    private typeCreditService:TypeCreditService,
    private dataSource:DataSource
  ) { }

  async create(createCreditInput: CreateCreditInput): Promise<Credit> {
    const newCredit:Credit = new Credit(createCreditInput)
    const affiliate:Affiliate= await this.affiliateService.findOne(createCreditInput.affiliateId)
    const typeCredit:TypeCredit= await this.typeCreditService.findOne(createCreditInput.idTypeCredit)
    const creditAccount:CreditAccount[]=[]
    typeCredit.auxiliarys.map((auxiliary) =>{
       const data:CreditAccount=new CreditAccount()
       data.account=auxiliary
       data.value=createCreditInput.creditValue
       data.concept=createCreditInput.concept
       creditAccount.push(data)
    })

    if(affiliate && typeCredit){
      newCredit.typeCredit=typeCredit
      newCredit.affiliate=affiliate
      newCredit.creditAccounts=creditAccount

      return await this.creditRepository.save(newCredit);
    }
  }

  async findAll(): Promise<ViewCredit[]> {
    console.log(await this.dataSource.manager.find(ViewCredit) )
    return await this.dataSource.manager.find(ViewCredit) 

  } 
   
  async updateState(id:number,state:StateCredit):Promise<Credit>{
      console.log(await this.creditRepository.update({id:id},{state:state}));
      return await this.findOne(id);
   }

  async findOne(id: number): Promise<Credit> {
    return this.creditRepository.findOne(
       {relations :{
	 affiliate:{
	    user:true
	 },
	 typeCredit:true,
	 installments:true
       },where:{id:id}})	 

  }
  async delete(id: number): Promise<Boolean> {
    try {
       await this.creditRepository.delete(id);
       return true;
    } catch (e) {
       console.log(e)
       return false;
    }
  }


   async isRefinance(id:number):Promise<Boolean>{
     const query= await this.creditRepository.findOne(
	 {
	    where :{
	       id:id,
	       state:StateCredit.CURSO
	    },
	 }
      )
     return query ? true : false; 
   }
   
   async findAllCredit():Promise<Credit[]>{
      return this.creditRepository.find();
   }
   async refinance(id:number):Promise<RefinanceCredit>{
      const query = await this.dataSource.createQueryBuilder()
	       .addSelect("user.identification","identification")
	       .addSelect("user.name ","name")
	       .addSelect("user.lastName","lastName")
	       .addSelect("credit.interest ","interest")
	       .addSelect("typeCredit.name","typeCredit")
	       .addSelect("typeCredit.id","idTypeCredit")
	       .addSelect("installments.finalBalance","previewBalance")
	       .from(Installment,"installments")
	       .leftJoin(Credit,"credit","installments.id_credit=credit.id")
	       .leftJoin(Affiliate, "affiliate", "credit.affiliateIdAffiliate= affiliate.idAffiliate")
	       .leftJoin(User, "user", "affiliate.idAffiliate= user.identification")
	       .leftJoin(TypeCredit, "typeCredit", "credit.typeCreditId=typeCredit.id ")
	       .where("installments.state= :state",{state:StateInstallment.PAGADA})
	       .andWhere("credit.id = :id",{id:id})
	       .orderBy("installments.installmentNumber","DESC")
	       .getRawOne()
	 console.log(query)
     return {...query ,nameAffiliate:`${query.name} ${query.lastName}`}; 
   }

  async amortizationTableGenerate(dateCredit:Date,valueLoan:number,interest:number,installments:number):Promise<CreateInstallment[]>{
     const array:CreateInstallment[]=[]
     let loanPartial=valueLoan
     const valueInstallment=this.pmt(valueLoan,((interest*(12/100))*100),installments)
    for (let i = 0; i < installments; i++) {
       const interestValue=loanPartial*(0.014)
       const finalBalance=loanPartial-(valueInstallment-interestValue)

       array.push({installmentNumber:i+1,paymentDate:addMonths( dateCredit,i),initialBalance:Math.round(loanPartial),
		  scheduledPayment:Math.round(valueInstallment),extraPayment:0,totalPayment:Math.round(valueInstallment),
		  capital:Math.round(valueInstallment-interestValue),
		  interest:Math.round(interestValue),finalBalance:Math.round(finalBalance)})

	 loanPartial=loanPartial-(valueInstallment-interestValue)

    }
     return array ;
  }

    async amortizationTableGenerateThree(dateCredit:Date,valueLoan:number,interest:number,valuePayment:number):Promise<CreateInstallment[]>{
     const array:CreateInstallment[]=[]
     let flag=false
     let loanPartial=valueLoan
     let valueInstallment=valuePayment
     let interestValue=loanPartial*(0.014)
     let finalBalance=loanPartial-(valueInstallment-interestValue)
	 console.log(finalBalance)
    for (let i = 0; flag ===false ; i++) {
       array.push({installmentNumber:i+1,paymentDate:addMonths( dateCredit,i),initialBalance:Math.round(loanPartial),
		  scheduledPayment:Math.round(valueInstallment),extraPayment:0,totalPayment:Math.round(valueInstallment),
		  capital:Math.round(valueInstallment-interestValue),
		  interest:Math.round(interestValue),finalBalance:Math.round(finalBalance) 		  
       })

	 loanPartial=finalBalance
	 interestValue=loanPartial*(0.014)
	 if(finalBalance==0 ){
	    flag=true   
	 }

	 if(finalBalance < valueInstallment){
	    valueInstallment=finalBalance+interestValue
	 }

	    finalBalance=loanPartial-(valueInstallment-interestValue)
    }
     return array ;
   }

   async amortizationTableGenerateCaseTwo(scheduledPayment:number,dateCredit:Date,installments:number,interest:number):Promise<CreateInstallment[]>{
      const  valueCredit=this.pmtTwo(scheduledPayment,((interest*(12/100))*100),installments)
      return this.amortizationTableGenerate(dateCredit,valueCredit,interest,installments);
   } 

  async amortizationTableChange(array:CreateInstallment[]):Promise<CreateInstallment[]>{
      const arrayFinal:CreateInstallment[]=[]
      let loanInitial=array[0].initialBalance
      let interestValue=0
      let finalBalance=0
      let totalPayment=0
      let scheduledPayment=array[0].scheduledPayment
      for (let i = 0; i < array.length; i++) {
       
	    interestValue=loanInitial*(0.014)
	   
	       totalPayment=scheduledPayment+array[i].extraPayment
	       finalBalance=loanInitial-(totalPayment-interestValue)
	      
	 arrayFinal.push({installmentNumber:i+1,paymentDate:array[i].paymentDate,initialBalance:Math.round(loanInitial),
			   scheduledPayment:Math.round(scheduledPayment),extraPayment:Math.round(array[i].extraPayment),
			   totalPayment:Math.round(totalPayment),
			   capital:Math.round(totalPayment-interestValue),
			   interest:Math.round(interestValue),
			   finalBalance:Math.round(finalBalance)})
	 
	    loanInitial=finalBalance
	     if(finalBalance < scheduledPayment){
		  scheduledPayment=finalBalance+(loanInitial*0.014)
	        }
	    if(finalBalance===0){
	       break
	    }

      }
      return arrayFinal;
   }

   pmt(principal: number, interestRate: number, numberOfPayments: number): number {
      const monthlyInterestRate = interestRate /( 12*100);
      console.log(monthlyInterestRate)
      const presentValueFactor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
      console.log(presentValueFactor)
      return principal * monthlyInterestRate * presentValueFactor / (presentValueFactor - 1);
   }

  pmtTwo(scheduledPayment: number, interestRate: number, numberOfPayments: number): number {
      const monthlyInterestRate = interestRate /( 12*100);
      console.log(monthlyInterestRate)
      const presentValueFactor = Math.pow(1 + monthlyInterestRate,-numberOfPayments);
      console.log(presentValueFactor)
      return scheduledPayment*((1-presentValueFactor)/(monthlyInterestRate));
   }
}

