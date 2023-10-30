import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { } from './dto/update-installment.input';
import { Installment } from './installment.entity';
import { Credit } from '../credit.entity';
import { CreateInstallment } from './dto/create-installment.input';
import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { User } from 'src/modules/parameterization/thirds/user/user.entity';
import { TypeCredit } from 'src/modules/parameterization/type-credit/type-credit.entity';
import { InstallmentPayment } from './dto/types';
import { StateInstallment } from './dto/enum-types';

@Injectable()
export class InstallmentsService {
  constructor(
   @InjectRepository(Installment)
    private installmentRepository: Repository<Installment>,
    private dataSource:DataSource
  ) { }

  async findAll(date:Date): Promise<InstallmentPayment[]> {
   const query:InstallmentPayment[] = await this.dataSource.createQueryBuilder()
	       .addSelect("user.identification","identification")
	       .addSelect("user.name ","name")
	       .addSelect("user.lastName","lastName")
	       .addSelect("typeCredit.name","typeCredit")
	       .addSelect("typeCredit.id","idTypeCredit")
	       .addSelect("installments.paymentDate","paymentDate")
	       .addSelect("installments.finalBalance","finalBalance")
	       .addSelect("credit.interest","interest")
	       .addSelect("installments.installmentNumber","installmentNumber")
	       .addSelect("installments.scheduledPayment","scheduledPayment")
	       .addSelect("installments.id_credit","credit")
	       .addSelect("installments.extraPayment","extraPayment")
	       .addSelect("installments.totalPayment","totalPayment")
	       .addSelect("installments.capital","capital")
	       .addSelect("installments.interest","interestPayment")
	       .from(Installment,"installments")
	       .leftJoin(Credit,"credit","installments.id_credit=credit.id")
	       .leftJoin(Affiliate, "affiliate", "credit.affiliateIdAffiliate= affiliate.idAffiliate")
	       .leftJoin(User, "user", "affiliate.idAffiliate= user.identification")
	       .leftJoin(TypeCredit, "typeCredit", "credit.typeCreditId=typeCredit.id ")
	       .where("installments.paymentDate= :paymentDate",{paymentDate:date.toISOString().split("T",1)[0]})
	       .andWhere("installments.state=:state",{state:StateInstallment.PENDIENTE})
	       .orderBy("installments.installmentNumber","DESC")
	       .getRawMany()
     return query; 
  }

   async findAllIsntallmentByCredit(id:number){
   const query:InstallmentPayment[] = await this.dataSource.createQueryBuilder()
	       .addSelect("user.identification","identification")
	       .addSelect("user.name ","name")
	       .addSelect("user.lastName","lastName")
	       .addSelect("typeCredit.name","typeCredit")
	       .addSelect("installments.paymentDate","paymentDate")
	       .addSelect("installments.finalBalance","finalBalance")
	       .addSelect("credit.interest","interest")
	       .addSelect("installments.installmentNumber","installmentNumber")
	       .addSelect("installments.scheduledPayment","scheduledPayment")
	       .addSelect("installments.id_credit","credit")
	       .addSelect("installments.extraPayment","extraPayment")
	       .addSelect("installments.totalPayment","totalPayment")
	       .addSelect("installments.capital","capital")
	       .addSelect("installments.interest","interestPayment")
	       .from(Installment,"installments")
	       .leftJoin(Credit,"credit","installments.id_credit=credit.id")
	       .leftJoin(Affiliate, "affiliate", "credit.affiliateIdAffiliate= affiliate.idAffiliate")
	       .leftJoin(User, "user", "affiliate.idAffiliate= user.identification")
	       .leftJoin(TypeCredit, "typeCredit", "credit.typeCreditId=typeCredit.id ")
	       .orderBy("installments.installmentNumber","DESC")
	       .getRawMany()
     return query; 
  }


  async finOneByCreditAndNumberInstallment(idCredit:number,numberInstallment:number):Promise<Installment>{
     return await this.installmentRepository.findOne(
	{where :{ id_credit:idCredit ,
		  installmentNumber:numberInstallment
	}})

  }
  
  async updateState(installmentNumber:number,state:StateInstallment):Promise<Installment>{
      console.log(await this.installmentRepository.update({installmentNumber:installmentNumber},{state:state}));
      return new Installment()
   }


}

