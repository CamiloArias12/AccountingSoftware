import { Injectable } from '@nestjs/common';
import { CreateSavingInput } from './dto/create-saving.input';
import { UpdateSavingInput } from './dto/update-saving.input';

@Injectable()
export class SavingService {
  create(createSavingInput: CreateSavingInput) {
    return 'This action adds a new saving';
  }

  findAll() {
    return `This action returns all saving`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saving`;
  }

  update(id: number, updateSavingInput: UpdateSavingInput) {
    return `This action updates a #${id} saving`;
  }

  remove(id: number) {
    return `This action removes a #${id} saving`;
  }
}
