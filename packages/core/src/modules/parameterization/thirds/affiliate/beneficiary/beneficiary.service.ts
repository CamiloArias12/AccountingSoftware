import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(
    dto: BeneficiaryInput,
    queryRunner?: QueryRunner,
  ): Promise<Beneficiary> {
    const beneficiary = this.beneficiaryRepository.create(dto);

    if (queryRunner) {
      return queryRunner.manager.save(Beneficiary, beneficiary);
    } else {
      return await this.beneficiaryRepository.save(beneficiary);
    }
  }
  async update(beneficiary: Beneficiary, queryRunner?: QueryRunner) {
    if (queryRunner) {
      queryRunner.manager.update(
        Beneficiary,
        { idDocument: beneficiary.idDocument },
        { name: beneficiary.name },
      );
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

  async delete(id: number): Promise<void> {
    await this.beneficiaryRepository.delete(id);
  }
}
