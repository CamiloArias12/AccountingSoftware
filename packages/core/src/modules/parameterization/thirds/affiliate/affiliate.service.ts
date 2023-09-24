import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Affiliate } from './affiliate.entity';
import { CreateAfiliateDto } from './dto/createAfiliate.dto';
import { UpdateAfiliateDto } from './dto/updateAfiliate.dto';
import { User } from '../user/user.entity';
import { BeneficiaryAffiliate } from './beneficiary-affiliate/beneficiary-affiliate.entity';
import { Beneficiary } from './beneficiary/beneficiary.entity';
import { BeneficiaryInput } from './beneficiary/dto/createBeneficiary.dto';
import { BeneficiaryService } from './beneficiary/beneficiary.service';
import { BeneficiaryAffiliateService } from './beneficiary-affiliate/beneficiary-affiliate.service';


@Injectable()
export class AffiliateService {
    constructor(
        @InjectRepository(Affiliate)
        private readonly affiliateRepository: Repository<Affiliate>,
	private readonly beneficiaryService:BeneficiaryService,
	private readonly beneficiaryAffiliateService:BeneficiaryAffiliateService,
    ) {}

    async create(queryRunner:QueryRunner,affiliateInput: CreateAfiliateDto,user:User,beneficiaryInput:BeneficiaryInput[],beneficiariesPercentage:number[]){

         console.log("createAfiliate") 
	    const affiliate :Affiliate= this.affiliateRepository.create(affiliateInput);
	     affiliate.user=user 
	     await queryRunner.manager.save(Affiliate,affiliate) 
	       
	    for (const data of beneficiaryInput) {

	       const queryBeneficiary:Beneficiary= await queryRunner.manager.findOneBy(Beneficiary,{ idDocument:data.idDocument})

	       if(!queryBeneficiary){
		  const beneficiary:Beneficiary= new Beneficiary()
		  beneficiary.idDocument=data.idDocument
		  beneficiary.name=data.name
		  await this.beneficiaryService.create(beneficiary,queryRunner) 
		  
		  }
	       const beneficiaryAffiliate:BeneficiaryAffiliate= new BeneficiaryAffiliate()
	       const beneficiary:Beneficiary=new Beneficiary()
	       beneficiary.idDocument=data.idDocument
	       beneficiary.name=data.name
	       beneficiaryAffiliate.affiliate=affiliate
	       beneficiaryAffiliate.beneficiary=beneficiary
	       beneficiaryAffiliate.percentage=beneficiariesPercentage[0]
	       beneficiariesPercentage.shift()

	    console.log(   await this.beneficiaryAffiliateService.create(beneficiaryAffiliate,queryRunner))

	    
	    }
    }

    async findAll(): Promise<Affiliate[]> {
      console.log("Obtener afiliados") 
       return await this.affiliateRepository.createQueryBuilder('affiliate').leftJoinAndSelect('affiliate.user','user').getMany()

    }


    async findOne(identification:number):Promise<Affiliate> {
	 
      const user= this.affiliateRepository
        .createQueryBuilder('affiliate')
        .leftJoinAndSelect('affiliate.user', 'user')
        .leftJoinAndSelect('affiliate.beneficiaries', 'beneficiaryAffiliate')
        .leftJoinAndSelect('beneficiaryAffiliate.beneficiary', 'beneficiary')
        .where('affiliate.idAffiliate = :identification', { identification:identification })
	return await user.getOne();
    }


      
/*
    async findOne(numberAccount: number): Promise<User> {
        const user:User = await this.userService.findOne(numberAccount)

        if (!user&& !user.affiliate) {
            throw new NotFoundException(`Afiliado con ID ${numberAccount} no encontrado`);
	}
        return user;
    }
*/
    async update(numberAccount: number, updateDto: UpdateAfiliateDto): Promise<Affiliate> {
        const afiliate = await this.affiliateRepository.preload({ numberAccount, ...updateDto });
        if (!afiliate) {
            throw new NotFoundException(`Afiliado con ID ${numberAccount} no encontrado`);
        }    
        return await this.affiliateRepository.save(afiliate);
    }    
  
}
