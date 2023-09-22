import { Injectable } from '@nestjs/common';
import { CreateCreditInput } from './dto/create-credit.input';
import { UpdateCreditInput } from './dto/update-credit.input';

@Injectable()
export class CreditService {
  create(createCreditInput: CreateCreditInput) {
    return 'This action adds a new credit';
  }

  findAll() {
    return `This action returns all credit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credit`;
  }

  update(id: number, updateCreditInput: UpdateCreditInput) {
    return `This action updates a #${id} credit`;
  }

  remove(id: number) {
    return `This action removes a #${id} credit`;
  }
}
