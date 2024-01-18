import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Affiliate } from './affiliate.entity';
import { CreateAfiliateDto } from './dto/createAfiliate.dto';
import { UpdateAfiliateDto } from './dto/updateAfiliate.dto';
import { User } from '../user/user.entity';
import { BeneficiaryAffiliate } from './beneficiary-affiliate/beneficiary-affiliate.entity';
import { Beneficiary } from './beneficiary/beneficiary.entity';
import {
  BeneficiaryInput,
  BeneficiaryInputGeneral,
} from './beneficiary/dto/createBeneficiary.dto';
import { BeneficiaryService } from './beneficiary/beneficiary.service';
import { BeneficiaryAffiliateService } from './beneficiary-affiliate/beneficiary-affiliate.service';

@Injectable()
export class AffiliateService {
  constructor(
    @InjectRepository(Affiliate)
    private readonly affiliateRepository: Repository<Affiliate>,
    private readonly beneficiaryService: BeneficiaryService,
    private readonly beneficiaryAffiliateService: BeneficiaryAffiliateService,
  ) {}

  async create(
    queryRunner: QueryRunner,
    affiliateInput: CreateAfiliateDto,
    user: User,
    beneficiaryInput: BeneficiaryInputGeneral[],
  ) {
    console.log('createAfiliate');
    const affiliate: Affiliate =
      this.affiliateRepository.create(affiliateInput);
    affiliate.user = user;
    await queryRunner.manager.save(Affiliate, affiliate);

    for (const data of beneficiaryInput) {
      const queryBeneficiary: Beneficiary = await queryRunner.manager.findOneBy(
        Beneficiary,
        { idDocument: data.beneficiary.idDocument },
      );
      console.log(queryBeneficiary);
      if (!queryBeneficiary) {
        console.log('Create beneficiary');
        const beneficiary: Beneficiary = new Beneficiary();
        beneficiary.idDocument = data.beneficiary.idDocument;
        beneficiary.name = data.beneficiary.name;
        await this.beneficiaryService.create(beneficiary, queryRunner);
      }
      const beneficiaryAffiliate: BeneficiaryAffiliate =
        new BeneficiaryAffiliate();
      const beneficiary: Beneficiary = new Beneficiary();
      beneficiary.idDocument = data.beneficiary.idDocument;
      beneficiary.name = data.beneficiary.name;
      beneficiaryAffiliate.affiliate = affiliate;
      beneficiaryAffiliate.beneficiary = beneficiary;
      beneficiaryAffiliate.percentage = data.percentage;

      console.log(
        await this.beneficiaryAffiliateService.create(
          beneficiaryAffiliate,
          queryRunner,
        ),
      );
    }
  }

  async delete(identification: number) {
    try {
      await this.affiliateRepository.delete(identification);
    } catch (e) {
      console.log(e);
      await this.affiliateRepository.update(
        { idAffiliate: identification },
        { state: false },
      );
      /* handle error */
    }
  }

  async count() {
    return await this.affiliateRepository.count();
  }

  async findAll(): Promise<Affiliate[]> {
    console.log('Obtener afiliados');
    return await this.affiliateRepository
      .createQueryBuilder('affiliate')
      .leftJoinAndSelect('affiliate.user', 'user')
      .getMany();
  }

  async findOne(identification: number): Promise<Affiliate> {
    return await this.affiliateRepository.findOne({
      where: { idAffiliate: identification },
      relations: {
        user: true,
      },
    });
  }
}
