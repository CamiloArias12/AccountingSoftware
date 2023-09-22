import { Injectable } from '@nestjs/common';
import { CreateInstallmentInput } from './dto/create-installment.input';
import { UpdateInstallmentInput } from './dto/update-installment.input';

@Injectable()
export class InstallmentsService {
  create(createInstallmentInput: CreateInstallmentInput) {
    return 'This action adds a new installment';
  }

  findAll() {
    return `This action returns all installments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} installment`;
  }

  update(id: number, updateInstallmentInput: UpdateInstallmentInput) {
    return `This action updates a #${id} installment`;
  }

  remove(id: number) {
    return `This action removes a #${id} installment`;
  }
}
