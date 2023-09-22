import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';
import { TypeAccount } from '../type-account.entity';
import { TypeAccountService } from '../type-account.service';
import { Group } from '../group/group.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        private readonly typeAccountService: TypeAccountService,
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>
    ) { }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const group = await this.groupRepository.findOne({ where: { code: createAccountDto.groupCode } });
        if (!group) {
            throw new NotFoundException(`Group con id ${createAccountDto.groupCode} no encontrado`);
        }

        const typeAccount: TypeAccount = await this.typeAccountService.create(createAccountDto);
        if (!typeAccount) {
            throw new NotFoundException(`No se pudo crear TypeAccount`);
        }

        const account: Account = new Account();
        account.typeAccount = typeAccount;
        account.group = group;

        return await this.accountRepository.save(account);
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

    async findAccount(codes: number[]): Promise<Account[]> {
        return await this.accountRepository.find(
            { where: { code: In(codes) } }
        );
    }

    async updateAccount(code: number, updateData: UpdateAccountDto): Promise<Account> {
        if (this.findOne(code)) {
          const typeAccount: TypeAccount = new TypeAccount()
          console.log(typeAccount)
          return this.typeAccountService.update(code, typeAccount).then((typeAccount: TypeAccount) => {
            return this.findOne(typeAccount.code)
          })
    
        }
        return null
      }
}
