import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';
import { TypeAccount } from '../type-account.entity';
import { TypeAccountService } from '../type-account.service';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        private readonly typeAccountService: TypeAccountService
    ) { }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const typeAccount: TypeAccount = await this.typeAccountService.create(createAccountDto);
        if (typeAccount) {
            const account: Account = new Account();
            account.typeAccount = typeAccount;
            return await this.accountRepository.save(account);
        }
    }    

    async findAll(): Promise<Account[]> {
        return await this.accountRepository.find();
    }

    async findOne(code: number): Promise<Account> {
        const account = await this.accountRepository.findOne({
            where: {
                code,
            },
        });
        if (!account) {
            throw new NotFoundException(`Account with code ${code} not found`);
        }
        return account;
    }

    async update(code: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
        const account = await this.accountRepository.preload({
            code: code,
            ...updateAccountDto,
        });
        if (!account) {
            throw new NotFoundException(`Account with code ${code} not found`);
        }
        return await this.accountRepository.save(account);
    }

    async remove(code: number): Promise<void> {
        const account = await this.findOne(code);
        await this.accountRepository.remove(account);
    }
}
