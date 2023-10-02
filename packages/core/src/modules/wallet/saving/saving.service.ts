import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saving } from './saving.entity';
import { CreateSavingInput } from './dto/create-saving.input';
import { UpdateSavingInput } from './dto/update-saving.input';

@Injectable()
export class SavingService {
  constructor(
    @InjectRepository(Saving)
    private savingRepository: Repository<Saving>,
  ) { }

  async create(createSavingInput: CreateSavingInput): Promise<Saving> {
    createSavingInput.startDate = new Date(createSavingInput.startDate.toISOString().split('T')[0]);
    const newSaving = this.savingRepository.create(createSavingInput);
    return this.savingRepository.save(newSaving);
  }

  async findAll(): Promise<Saving[]> {
    return this.savingRepository.find();
  }

  async findOne(id: number): Promise<Saving> {
    return this.savingRepository.findOne({ where: { id: id } });
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
    return this.savingRepository.save(existingSaving);
  }

  async remove(id: number): Promise<void> {
    await this.savingRepository.delete(id);
  }
}

