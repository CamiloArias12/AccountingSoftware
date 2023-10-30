import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstallmentAccount } from './installment-account.entity';
import { Repository } from 'typeorm';
import { InstallmentPayment } from 'src/modules/wallet/credit/installments/dto/types';
import { TypeCreditService } from 'src/modules/parameterization/type-credit/type-credit.service';
import { Auxiliary } from 'src/modules/parameterization/type-account/auxiliary/auxiliary.entity';
import { InstallmentsService } from 'src/modules/wallet/credit/installments/installments.service';
import { CreditService } from 'src/modules/wallet/credit/credit.service';
import { StateCredit } from 'src/modules/wallet/credit/dto/enum-types';
import { StateInstallment } from 'src/modules/wallet/credit/installments/dto/enum-types';
@Injectable()
export class InstallmentAccountService {
    constructor(
        @InjectRepository(InstallmentAccount)
        private readonly accountRepository: Repository<InstallmentAccount>,
	private readonly typeCreditService:TypeCreditService,
	private readonly installmentService:InstallmentsService,
	private readonly creditService:CreditService
	
    ) { }

    async create(dto:InstallmentPayment[],date :Date,concept:string): Promise<Boolean> {
	dto.map( async (data)=>{
	   const auxiliaries:Auxiliary[]=(await this.typeCreditService.findOne(data.idTypeCredit)).auxiliarys 
	    auxiliaries.map(async (auxliary)=>{
	       const installmentAccount:InstallmentAccount=new InstallmentAccount()
	       installmentAccount.date=date
	       installmentAccount.value=data.totalPayment
	       installmentAccount.concept=concept
	       installmentAccount.account=auxliary
	       installmentAccount.installment=await this.installmentService.finOneByCreditAndNumberInstallment(data.credit,data.installmentNumber)
	       await  this.accountRepository.save(installmentAccount)
	    })
	 if(data.installmentNumber===1){
	  await this.creditService.updateState(data.credit,StateCredit.CURSO)
	 }
	 await  this.installmentService.updateState(data.installmentNumber,StateInstallment.PAGADA)
	}) 
      return true;
    }

    
}
