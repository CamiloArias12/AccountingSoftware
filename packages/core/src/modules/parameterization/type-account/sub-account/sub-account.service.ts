import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateSubAccountDto } from './dto/createSubAccount.dto';
import { UpdateSubAccountDto } from './dto/updateSubAccount.dto';
import { SubAccount } from './sub-account.entity';
import { TypeAccountService } from '../type-account.service';
import { TypeAccount } from '../type-account.entity';
import { Account } from '../account/account.entity';

@Injectable()
export class SubAccountService {
    constructor(
        @InjectRepository(SubAccount)
        private readonly subAccountRepository: Repository<SubAccount>,
        private readonly typeAccountService: TypeAccountService,
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>
    ) { }


    async create(createSubAccountDto: CreateSubAccountDto): Promise<SubAccount> {
        const account = await this.accountRepository.findOne({ where: { code: createSubAccountDto.accountCode } });
        if (!account) {
            throw new NotFoundException(`Account con id ${createSubAccountDto.accountCode} no encontrado`);
        }

        const typeAccount: TypeAccount = await this.typeAccountService.create(createSubAccountDto);
        if (!typeAccount) {
            throw new NotFoundException(`No se pudo crear TypeAccount`);
        }

        const subAccount: SubAccount = new SubAccount();
        subAccount.typeAccount = typeAccount;
        subAccount.account = account;

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

    async findSubAccount(codes: number[]): Promise<SubAccount[]> {
        return await this.subAccountRepository.find(
            { where: { code: In(codes) } }
        );
    }

    async updateSubAccount(code: number, updateData: UpdateSubAccountDto): Promise<SubAccount> {
        if (this.findOne(code)) {
          const typeAccount: TypeAccount = new TypeAccount();
          console.log(typeAccount)
          return this.typeAccountService.update(code, typeAccount).then((typeAccount: TypeAccount) => {
            return this.findOne(typeAccount.code)
          })
    
        }
        return null
      }
}

