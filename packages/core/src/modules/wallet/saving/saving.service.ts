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
    private affiliateService:AffiliateService,
    private typeSavingService:TypeSavingService,
    private dataSource:DataSource
  ) { }

  async create(createSavingInput: CreateSavingInput): Promise<Boolean> {

   try {

    const newSaving = this.savingRepository.create(createSavingInput);
    const affiliate:Affiliate=await this.affiliateService.findOne(createSavingInput.affiliateId)
    const typeSaving:TypeSaving=await this.typeSavingService.findOne(createSavingInput.typeSavingId)
    newSaving.affiliate=affiliate
    newSaving.typeSaving=typeSaving
    await this.savingRepository.save(newSaving)
    return true;

   } catch (e) {
      return false;
   }  
    
  }

  async findAll(): Promise<ViewSaving[]> {
    return await this.dataSource.manager.find(ViewSaving) 
      }

  async findOne(id: number): Promise<Saving> {
    return  await this.savingRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateSavingInput: UpdateSavingInput): Promise<Saving> {
    if (updateSavingInput.startDate) {
      const date = new Date(updateSavingInput.startDate);
      updateSavingInput.startDate = new Date(date.toISOString().split('T')[0]);
    }
    
    const existingSaving = await this.savingRepository.preload({ id, ...updateSavingInput });
    if (!existingSaving) {
      throw new Error('Saving not found');
    }
    return await this.savingRepository.save(existingSaving);
  }

  async remove(id: number): Promise<void> {
    await this.savingRepository.delete(id);
  }
}

