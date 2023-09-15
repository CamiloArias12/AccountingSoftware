import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BeneficiaryAffiliate } from './beneficiary-affiliate.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class BeneficiaryAffiliateService {
      constructor(
	 @InjectRepository(BeneficiaryAffiliate)
	 private readonly beneficiaryAffiliateRepository:Repository<BeneficiaryAffiliate>,
      ){}


      async create(beneficiaryAffiliate:BeneficiaryAffiliate,queryRunner:QueryRunner | null){
	 
	 if(queryRunner){
	    return queryRunner.manager.save(BeneficiaryAffiliate,beneficiaryAffiliate)
	 }else{
	    return this.beneficiaryAffiliateRepository.save(beneficiaryAffiliate)
	 }
	 

      }
      
      

}
