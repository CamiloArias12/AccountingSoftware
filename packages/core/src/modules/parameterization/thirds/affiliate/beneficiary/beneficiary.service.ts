import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Beneficiary } from './beneficiary.entity';
import { UpdateBeneficiaryDto } from './dto/updateBeneficiary.dto';
import { BeneficiaryInput } from './dto/createBeneficiary.dto';


@Injectable()
export class BeneficiaryService {
    constructor(
        @InjectRepository(Beneficiary)
        private readonly beneficiaryRepository: Repository<Beneficiary>,
    ) {}

    async create(dto: BeneficiaryInput,queryRunner?:QueryRunner ): Promise<Beneficiary> {
	 
      const beneficiary = this.beneficiaryRepository.create(dto);

       if (queryRunner) {
	    return queryRunner.manager.save(Beneficiary,beneficiary); 
       }else{

	    return await this.beneficiaryRepository.save(beneficiary);
       }
    }

    async findAll(): Promise<Beneficiary[]> {
        return await this.beneficiaryRepository.find();
    }

    async findOne(idDocument: number): Promise<Beneficiary> {
        const beneficiary = await this.beneficiaryRepository.findOne({
            where: {
                idDocument,
            },
        });
        return beneficiary;
    }

    async update(idDocument: number, updateDto: UpdateBeneficiaryDto): Promise<Beneficiary> {
        const beneficiary = await this.beneficiaryRepository.preload({ idDocument, ...updateDto });
        return await this.beneficiaryRepository.save(beneficiary);
    }

    async remove(id: number): Promise<void> {
        const beneficiary = await this.findOne(id);
        await this.beneficiaryRepository.remove(beneficiary);
    }
}
