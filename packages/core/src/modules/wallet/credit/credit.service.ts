import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credit } from './credit.entity';
import { CreateCreditInput } from './dto/create-credit.input';
import { UpdateCreditInput } from './dto/update-credit.input';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
  ) { }

  async create(createCreditInput: CreateCreditInput): Promise<Credit> {
    createCreditInput.startDate = new Date(createCreditInput.startDate.toISOString().split('T')[0]);
    const newCredit = this.creditRepository.create(createCreditInput);
    return this.creditRepository.save(newCredit);
  }

  async findAll(): Promise<Credit[]> {
    return this.creditRepository.find();
  }

  async findOne(id: number): Promise<Credit> {
    return this.creditRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateCreditInput: UpdateCreditInput): Promise<Credit> {
    if (updateCreditInput.startDate) {
      const date = new Date(updateCreditInput.startDate);
      updateCreditInput.startDate = new Date(date.toISOString().split('T')[0]);
    }    
    
    await this.creditRepository.update(id, updateCreditInput);
    const updatedCredit = await this.creditRepository.findOne({ where: { id: id } });
    if (!updatedCredit) {
      throw new Error('Credit not found');
    }
    return updatedCredit;
  }

  async remove(id: number): Promise<void> {
    await this.creditRepository.delete(id);
  }
}


