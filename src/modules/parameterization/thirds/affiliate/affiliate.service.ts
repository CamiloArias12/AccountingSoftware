import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Affiliate } from './affiliate.entity';
import { CreateAfiliateDto } from './dto/createAfiliate.dto';
import { UpdateAfiliateDto } from './dto/updateAfiliate.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserInput } from '../user/dto/input/createuser.dto';
import { BeneficiaryAffiliate } from './beneficiary-affiliate/beneficiary-affiliate.entity';
import { Beneficiary } from './beneficiary/beneficiary.entity';
import { BeneficiaryInput } from './beneficiary/dto/createBeneficiary.dto';
import { BeneficiaryService } from './beneficiary/beneficiary.service';


@Injectable()
export class AffiliateService {
    constructor(
        @InjectRepository(Affiliate)
        private readonly affiliateRepository: Repository<Affiliate>,
	private readonly  userService:UserService,
	private readonly beneficiaryService:BeneficiaryService,
	private readonly dataSource:DataSource
    ) {}

    async create(affiliateInput: CreateAfiliateDto,userInput:UserInput,beneficiaryInput:BeneficiaryInput[],beneficiariesPercentage:number[]): Promise<Affiliate> {

      const  queryRunner= this.dataSource.createQueryRunner() 
      await queryRunner.connect()
      await queryRunner.startTransaction()
      const  user:User = await this.userService.findOne(userInput.identification)
      try {
         
       if(!user){

	    const affiliate :Affiliate= this.affiliateRepository.create(affiliateInput);
	      
	       await this.userService.createUser(userInput,queryRunner).then((user:User)  => {
		  affiliate.user=user 
	      })
	      
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
	       	       
	       await queryRunner.manager.save(BeneficiaryAffiliate,beneficiaryAffiliate)

	    }
	  

	    await queryRunner.commitTransaction()
	     return  affiliate 
	    } 
	 }catch(a){
	    console.log("Error transaccion",a)
	    await queryRunner.rollbackTransaction()
	 } finally{
	    await queryRunner.release()
      }
    }

    async findAll(): Promise<Affiliate[]> {
        return await this.affiliateRepository.find();
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
