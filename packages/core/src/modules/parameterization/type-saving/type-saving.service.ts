import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeSaving } from './type-saving.entity';
import { CreateTypeSavingDto } from './dto/createTypeSaving.dto';
import { SubAccountService } from '../type-account/sub-account/sub-account.service';
import { AccountService } from '../type-account/account/account.service';
import { AuxiliaryService } from '../type-account/auxiliary/auxiliary.service';
import { UpdateTypeSavingDto } from './dto/updateTypeSaving.dto';

@Injectable()
export class TypeSavingService {
    constructor(
        @InjectRepository(TypeSaving)
        private readonly typeSavingRepository: Repository<TypeSaving>,
        private readonly subAccountService: SubAccountService,
        private readonly accountService: AccountService,
        private readonly auxiliaryService: AuxiliaryService
    ) { }

    async createTypeSaving(data: CreateTypeSavingDto): Promise<TypeSaving> {
        const typeSaving = new TypeSaving();

        if (data.subAccount && data.subAccount.length) {
            typeSaving.subAccounts = await this.subAccountService.findSubAccount(data.subAccount);
        }

        if (data.account && data.account.length) {
            typeSaving.accounts = await this.accountService.findAccount(data.account);
        }

        if (data.auxiliary && data.auxiliary.length) {
            typeSaving.auxiliarys = await this.auxiliaryService.findAuxiliary(data.auxiliary);
        }

        typeSaving.idTypeSaving = data.idTypeSaving;
        typeSaving.nombre = data.nombre;

        return await this.typeSavingRepository.save(typeSaving);
    }

    async updateOrCreateTypeSaving(data: UpdateTypeSavingDto): Promise<TypeSaving> {
        let typeSaving = await this.typeSavingRepository.findOne({
            where: { idTypeSaving: data.idTypeSaving }
        });

        if (!typeSaving) {
            typeSaving = new TypeSaving();
            typeSaving.idTypeSaving = data.idTypeSaving;
        }

        if (data.subAccount && data.subAccount.length) {
            typeSaving.subAccounts = await this.subAccountService.findSubAccount(data.subAccount);
        }

        if (data.account && data.account.length) {
            typeSaving.accounts = await this.accountService.findAccount(data.account);
        }

        if (data.auxiliary && data.auxiliary.length) {
            typeSaving.auxiliarys = await this.auxiliaryService.findAuxiliary(data.auxiliary);
        }

        typeSaving.nombre = data.nombre;

        return await this.typeSavingRepository.save(typeSaving);
    }
}


