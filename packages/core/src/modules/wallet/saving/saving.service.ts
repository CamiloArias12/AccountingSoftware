import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Saving } from './saving.entity';
import { CreateSavingInput } from './dto/create-saving.input';
import { UpdateSavingInput } from './dto/update-saving.input';
import { AffiliateService } from 'src/modules/parameterization/thirds/affiliate/affiliate.service';
import { TypeSavingService } from 'src/modules/parameterization/type-saving/type-saving.service';
import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { TypeSaving } from 'src/modules/parameterization/type-saving/type-saving.entity';
import { ViewSaving } from './saving-view.entity';

@Injectable()
export class SavingService {
  constructor(
    @InjectRepository(Saving)
    private savingRepository: Repository<Saving>,
    private affiliateService: AffiliateService,
    private typeSavingService: TypeSavingService,
    private dataSource: DataSource,
  ) {}

  async create(createSavingInput: CreateSavingInput): Promise<Boolean> {
    try {
      const newSaving = this.savingRepository.create(createSavingInput);
      const affiliate: Affiliate = await this.affiliateService.findOne(
        createSavingInput.affiliateId,
      );
      const typeSaving: TypeSaving = await this.typeSavingService.findOne(
        createSavingInput.typeSavingId,
      );
      newSaving.affiliate = affiliate;
      newSaving.typeSaving = typeSaving;
      await this.savingRepository.save(newSaving);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async findAll(): Promise<ViewSaving[]> {
    return await this.dataSource.manager.find(ViewSaving);
  }

  async findOne(id: number): Promise<ViewSaving> {
    return await this.dataSource.getRepository(ViewSaving).findOne({
      where: { id: id },
    });
  }

  async count(): Promise<Number> {
    return await this.savingRepository.count();
  }

  async countAllByAffiliate(id: number) {
    return this.savingRepository.count({
      where: { affiliate: { identification: id } },
    });
  }

  async findOneSaving(id: number): Promise<Saving> {
    return await this.savingRepository.findOne({
      where: { id: id },
      relations: {
        affiliate: {
          user: true,
        },
        typeSaving: {
          auxiliaries: {
            account: true,
          },
        },
      },
    });
  }

  async update(updateSavingInput: UpdateSavingInput): Promise<Boolean> {
    try {
      await this.savingRepository.update(
        { id: updateSavingInput.id },
        { qoutaValue: updateSavingInput.qoutaValue },
      );
      return true;
    } catch (e) {
      /* handle error */
      return false;
    }
  }

  async remove(id: number): Promise<Boolean> {
    try {
      await this.savingRepository.delete(id);
      return true;
    } catch (e) {
      /* handle error */
      return false;
    }
  }
}
