import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstallmentInput } from './dto/create-installment.input';
import { UpdateInstallmentInput } from './dto/update-installment.input';
import { Installment } from './installment.entity';
import { Credit } from '../credit.entity';

@Injectable()
export class InstallmentsService {
  constructor(
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,

    @InjectRepository(Installment)
    private installmentRepository: Repository<Installment>,
  ) { }

  async create(createInstallmentInput: CreateInstallmentInput): Promise<Installment> {
    const newInstallment = this.installmentRepository.create(createInstallmentInput);
    newInstallment.credit = await this.creditRepository.findOne({
      where: { id: createInstallmentInput.creditId }
    });

    return this.installmentRepository.save(newInstallment);
  }


  async findAll(): Promise<Installment[]> {
    return this.installmentRepository.find();
  }

  async findOne(id: number): Promise<Installment> {
    return this.installmentRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateInstallmentInput: UpdateInstallmentInput): Promise<Installment> {
    await this.installmentRepository.update(id, updateInstallmentInput);
    const updatedInstallment = await this.installmentRepository.findOne({ where: { id: id } });
    if (!updatedInstallment) {
      throw new Error('Installment not found');
    }
    return updatedInstallment;
  }

  async remove(id: number): Promise<Installment> {
    const installmentToRemove = await this.installmentRepository.findOne({ where: { id: id } });
    if (!installmentToRemove) {
      throw new Error('Installment not found');
    }
    await this.installmentRepository.delete(id);
    return installmentToRemove;
  }

}

