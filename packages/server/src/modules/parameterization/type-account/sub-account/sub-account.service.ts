import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubAccountDto } from './dto/createSubAccount.dto';
import { UpdateSubAccountDto } from './dto/updateSubAccount.dto';
import { SubAccount } from './sub-account.entity';

@Injectable()
export class SubAccountService {
    constructor(
        @InjectRepository(SubAccount)
        private readonly subAccountRepository: Repository<SubAccount>,
    ) { }

    async create(createSubAccountDto: CreateSubAccountDto): Promise<SubAccount> {
        const subAccount = this.subAccountRepository.create(createSubAccountDto);
        return await this.subAccountRepository.save(subAccount);
    }

    async findAll(): Promise<SubAccount[]> {
        return await this.subAccountRepository.find();
    }

    async findOne(code: number): Promise<SubAccount> {
        const subAccount = await this.subAccountRepository.findOne({
            where: {
                code,
            },
        });
        if (!subAccount) {
            throw new NotFoundException(`SubAccount with code ${code} not found`);
        }
        return subAccount;
    }

    async update(code: number, updateSubAccountDto: UpdateSubAccountDto): Promise<SubAccount> {
        const subAccount = await this.subAccountRepository.preload({
            code: code,
            ...updateSubAccountDto,
        });
        if (!subAccount) {
            throw new NotFoundException(`SubAccount with code ${code} not found`);
        }
        return await this.subAccountRepository.save(subAccount);
    }

    async remove(code: number): Promise<void> {
        const subAccount = await this.findOne(code);
        await this.subAccountRepository.remove(subAccount);
    }
}

