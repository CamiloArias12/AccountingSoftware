import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { QueryRunner, Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async create(user: User, queryRunner?: QueryRunner): Promise<Provider> {
    const provider: Provider = new Provider();
    provider.user = user;
    if (queryRunner) {
      return await queryRunner.manager.save(Provider, provider);
    } else {
      return await this.providerRepository.save(provider);
    }
  }
  async delete(identification: number) {
    try {
      await this.providerRepository.delete(identification);
    } catch (e) {
      await this.providerRepository.update(
        { idProvider: identification },
        { state: true },
      );
      /* handle error */
    }
  }

  findAll() {
    return `This action returns all provider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }
  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
