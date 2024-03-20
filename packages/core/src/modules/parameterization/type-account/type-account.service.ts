import { Injectable, StreamableFile } from '@nestjs/common';
import { AccountService } from './account/account.service';
import { AuxiliaryService } from './auxiliary/auxiliary.service';
import { ClassAccountService } from './class-account/class-account.service';
import { GroupService } from './group/group.service';
import { SubAccountService } from './sub-account/sub-account.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeAccount } from './type-account.entity';
import { DataSource, Repository } from 'typeorm';
import { NatureEnum, TypeAccountEnum } from './dto/enum-type';
import { ClassAccount } from './class-account/class-account.entity';
import { Group } from './group/group.entity';
import { Account } from './account/account.entity';
import { SubAccount } from './sub-account/sub-account.entity';
import { Auxiliary } from './auxiliary/auxiliary.entity';
import * as path from 'path';
import * as Excel from 'exceljs';
import { AccountTypeGeneral } from './dto/types';
import { TypeAccountInput } from './dto/type-account-input';
import { ClassAccountResolver } from './class-account/class-account.resolver';
import * as tmp from 'tmp';
import { createReadStream } from 'fs';

import { AccountMovement } from 'src/modules/treasury/account-movement/account-movement.entity';
import { CashRegisterMovement } from 'src/modules/treasury/cash-register-movement/cash-register-movement.entity';
import { CreditMovement } from 'src/modules/treasury/credit-movement/credit-movement.entity';
import { DeferredMovement } from 'src/modules/treasury/deferred-movement/deferred-movement.entity';
import { DisbursementMovement } from 'src/modules/treasury/disbursement-movement/disbursement-movement.entity';
import { NoteMovement } from 'src/modules/treasury/note-movement/note-movement.entity';
import { Movement } from 'src/modules/treasury/movement/movement.entity';
@Injectable()
export class TypeAccountService {
  constructor(
    @InjectRepository(TypeAccount)
    private readonly typeAccountRepository: Repository<TypeAccount>,
    private readonly classAccountService: ClassAccountService,
    private readonly groupAccountService: GroupService,
    private readonly accountService: AccountService,
    private readonly subAccountService: SubAccountService,
    private readonly auxiliaryService: AuxiliaryService,
    private readonly classAccountResolver: ClassAccountResolver,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    data: TypeAccountInput,
    type: TypeAccountEnum,
    code?: number,
  ): Promise<boolean> {
    if (!(await this.findOne(data.code))) {
      const typeAccount = this.typeAccountRepository.create(data);
      let queryTypeAccount: TypeAccount = new TypeAccount();

      if (type === TypeAccountEnum.CLASS) {
        queryTypeAccount = await this.typeAccountRepository.save(typeAccount);
        const classAccount: ClassAccount =
          await this.classAccountService.create(queryTypeAccount);

        if (classAccount) return true;
      }

      if (type === TypeAccountEnum.GROUP && (await this.findOne(code))) {
        queryTypeAccount = await this.typeAccountRepository.save(typeAccount);
        const classAccount = await this.classAccountService.findOne(code);
        const group: Group = await this.groupAccountService.create(
          queryTypeAccount,
          classAccount,
        );

        if (group) return true;
      }

      if (type === TypeAccountEnum.ACCOUNT && (await this.findOne(code))) {
        queryTypeAccount = await this.typeAccountRepository.save(typeAccount);
        const group: Group = await this.groupAccountService.findOne(code);
        const account: Account = await this.accountService.create(
          queryTypeAccount,
          group,
        );

        if (account) return true;
      }

      if (type === TypeAccountEnum.SUBACCOUNT && (await this.findOne(code))) {
        queryTypeAccount = await this.typeAccountRepository.save(typeAccount);
        const account: Account = await this.accountService.findOne(code);
        const subAccount: SubAccount = await this.subAccountService.create(
          queryTypeAccount,
          account,
        );

        if (subAccount) return true;
      }

      if (type === TypeAccountEnum.AUXILIARY && (await this.findOne(code))) {
        queryTypeAccount = await this.typeAccountRepository.save(typeAccount);
        const subAccount: SubAccount =
          await this.subAccountService.findOne(code);
        const auxiliary: Auxiliary = await this.auxiliaryService.create(
          queryTypeAccount,
          subAccount,
        );

        if (auxiliary) return true;
      }
    } else {
      return false;
    }
  }

  async findAll(): Promise<TypeAccount[]> {
    return await this.typeAccountRepository.find();
  }

  async findOne(code: number): Promise<TypeAccount> {
    return await this.typeAccountRepository.findOne({ where: { code } });
  }

  async update(
    code: number,
    typeAccountData: TypeAccountInput,
  ): Promise<Boolean> {
    try {
      await this.typeAccountRepository.update(
        { code: code },
        {
          code: typeAccountData.code,
          name: typeAccountData.name,
          nature: typeAccountData.nature,
        },
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async delete(code: number): Promise<Boolean> {
    try {
      await this.typeAccountRepository.delete(code);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async updateStatus(code: number, status: boolean): Promise<Boolean> {
    try {
      await this.typeAccountRepository.update(
        { code: code },
        { state: status },
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async dowloadAccounts() {
    const workbook = new Excel.Workbook();
    workbook.created = new Date();
    const worksheet = workbook.addWorksheet('Plan de cuentas');
    worksheet.columns = [
      { header: 'Codigo', key: 'code', width: 30 },
      { header: 'Nombre', key: 'name', width: 60 },
      { header: 'Naturaleza', key: 'nature', width: 20 },
      { header: 'Tipo', key: 'type', width: 20 },
    ];
    const accounts = await this.classAccountResolver.getClassAccountAll();

    for (const classAccount of accounts) {
      worksheet.addRow({
        type: 'Clase',
        code: classAccount.typeAccount.code,
        name: classAccount.typeAccount.name,
        nature: classAccount.typeAccount.nature,
      });
      if (classAccount.groups) {
        for (const group of classAccount.groups) {
          worksheet.addRow({
            type: 'Grupo',
            code: group.typeAccount.code,
            name: group.typeAccount.name,
            nature: group.typeAccount.nature,
          });
          if (accounts) {
            for (const account of group.accounts) {
              worksheet.addRow({
                type: 'Cuenta',
                code: account.typeAccount.code,
                name: account.typeAccount.name,
                nature: account.typeAccount.nature,
              });
              if (account.subAccounts) {
                for (const subAccount of account.subAccounts) {
                  worksheet.addRow({
                    type: 'Subcuenta',
                    code: subAccount.typeAccount.code,
                    name: subAccount.typeAccount.name,
                    nature: subAccount.typeAccount.nature,
                  });
                  if (subAccount.auxiliaries) {
                    for (const auxiliary of subAccount.auxiliaries) {
                      worksheet.addRow({
                        type: 'Auxiliar',
                        code: auxiliary.typeAccount.code,
                        name: auxiliary.typeAccount.name,
                        nature: auxiliary.typeAccount.nature,
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    const file = tmp.fileSync({
      unsafeCleanup: true,
      mode: 0o644,
      prefix: 'puc',
      postfix: '.xlsx',
    });
    await workbook.xlsx.writeFile(file.name);
    return new StreamableFile(createReadStream(file.name));
  }

  async loadTypeAccounts(pathname: string, filename: string) {
    const filePath = path.join('./uploads', filename);

    const workbook = new Excel.Workbook();
    const content = await workbook.xlsx.readFile(filePath);

    const worksheet = content.worksheets[0];
    const rows = worksheet.getRows(2, worksheet.rowCount - 1) ?? [];
    const allAccounts: AccountTypeGeneral[] = [];
    for await (const row of rows) {
      if (row.getCell(1).value) {
        allAccounts.push({
          type: row.getCell(3)?.value?.toString(),
          typeAccount: {
            code: Number(row.getCell(1)?.value?.toString()),
            name: row.getCell(2)?.value?.toString(),
            nature: row.getCell(4)?.value?.toString(),
          },
        });
      } else {
        console.log(row.getCell(1).value);
        break;
      }
    }
    console.log(allAccounts);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let data: TypeAccount = new TypeAccount();
      let dataClass: ClassAccount = new ClassAccount();
      let account: Account = new Account();
      let group: Group = new Group();
      let subAccount: SubAccount = new SubAccount();
      let auxiliary: Auxiliary = new Auxiliary();
      for (let i = 0; i < allAccounts.length; i++) {
        data.name = allAccounts[i].typeAccount.name;
        data.code = allAccounts[i].typeAccount.code;
        data.nature = allAccounts[i].typeAccount.nature as NatureEnum;
        await queryRunner.manager.save(data);
        if (allAccounts[i].type === TypeAccountEnum.CLASS) {
          dataClass.typeAccount = data;
          await queryRunner.manager.findOne(TypeAccount, {
            where: { code: dataClass.code },
          });
          await queryRunner.manager.save(dataClass);
        }
      }
      for (let i = 0; i < allAccounts.length; i++) {
        if (allAccounts[i].type === TypeAccountEnum.GROUP) {
          const code: string = allAccounts[i].typeAccount.code.toString();
          data = await queryRunner.manager.findOne(TypeAccount, {
            where: { code: allAccounts[i].typeAccount.code },
          });
          dataClass = await queryRunner.manager.findOne(ClassAccount, {
            where: { code: parseInt(code[0]) },
          });
          group.typeAccount = data;
          group.classAccount = dataClass;
          await queryRunner.manager.save(group);
        }
      }

      for (let i = 0; i < allAccounts.length; i++) {
        if (allAccounts[i].type === TypeAccountEnum.ACCOUNT) {
          const code: string = allAccounts[i].typeAccount.code.toString();
          data = await queryRunner.manager.findOne(TypeAccount, {
            where: { code: allAccounts[i].typeAccount.code },
          });
          group = await queryRunner.manager.findOne(Group, {
            where: { code: parseInt(code.slice(0, 2)) },
          });
          account.typeAccount = data;
          account.group = group;
          await queryRunner.manager.save(account);
        }
      }

      for (let i = 0; i < allAccounts.length; i++) {
        if (allAccounts[i].type === TypeAccountEnum.SUBACCOUNT) {
          const code: string = allAccounts[i].typeAccount.code.toString();
          data = await queryRunner.manager.findOne(TypeAccount, {
            where: { code: allAccounts[i].typeAccount.code },
          });
          account = await queryRunner.manager.findOne(Account, {
            where: { code: parseInt(code.slice(0, 4)) },
          });
          subAccount.typeAccount = data;
          subAccount.account = account;

          await queryRunner.manager.save(subAccount);
        }
      }
      for (let i = 0; i < allAccounts.length; i++) {
        if (allAccounts[i].type === TypeAccountEnum.AUXILIARY) {
          const code: string = allAccounts[i].typeAccount.code.toString();
          data = await queryRunner.manager.findOne(TypeAccount, {
            where: { code: allAccounts[i].typeAccount.code },
          });
          subAccount = await queryRunner.manager.findOne(SubAccount, {
            where: { code: parseInt(code.slice(0, 6)) },
          });
          auxiliary.typeAccount = data;
          auxiliary.subAccount = subAccount;

          await queryRunner.manager.save(auxiliary);
        }
      }

      await queryRunner.commitTransaction();
      return true;
    } catch (a) {
      console.log('error', a);
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  async getStatisticsAccount(code: number, typeAccount: TypeAccountEnum) {
    console.log(code, typeAccount);
    const query = this.dataSource
      .createQueryBuilder()
      .addSelect(
        ' SUM(CASE WHEN account_movement.nature = "Debito" THEN value ELSE 0 END) ',
        'debit',
      )
      .addSelect(
        ' SUM(CASE WHEN account_movement.nature = "Credito" THEN value ELSE 0 END) ',
        'credit',
      )
      .addSelect('movement.date', 'date');

    typeAccount === TypeAccountEnum.CLASS && query.from(ClassAccount, 'class');
    typeAccount === TypeAccountEnum.GROUP && query.from(Group, 'group');
    typeAccount === TypeAccountEnum.ACCOUNT && query.from(Account, 'account');
    typeAccount === TypeAccountEnum.SUBACCOUNT &&
      query.from(SubAccount, 'sub_account');
    typeAccount === TypeAccountEnum.AUXILIARY &&
      query.from(Auxiliary, 'auxiliary');

    console.log(query.getQueryAndParameters());
    typeAccount === TypeAccountEnum.CLASS &&
      query.leftJoin(Group, 'group', 'class.code=group.classAccountCode');

    {
      (typeAccount === TypeAccountEnum.CLASS ||
        typeAccount === TypeAccountEnum.GROUP) &&
        query.leftJoin(Account, 'account', 'group.code= account.groupCode');
    }

    {
      (typeAccount === TypeAccountEnum.CLASS ||
        typeAccount === TypeAccountEnum.GROUP ||
        typeAccount === TypeAccountEnum.ACCOUNT) &&
        query.leftJoin(
          SubAccount,
          'sub_account',
          'account.code= sub_account.accountCode',
        );
    }

    {
      (typeAccount === TypeAccountEnum.CLASS ||
        typeAccount === TypeAccountEnum.GROUP ||
        typeAccount === TypeAccountEnum.ACCOUNT ||
        typeAccount === TypeAccountEnum.SUBACCOUNT) &&
        query.leftJoin(
          Auxiliary,
          'auxiliary',
          'sub_account.code= auxiliary.subAccountCode',
        );
    }
    query
      .leftJoin(
        AccountMovement,
        'account_movement',
        'auxiliary.code = account_movement.auxiliaryCode',
      )
      .leftJoin(
        CashRegisterMovement,
        'cash_movement',
        'account_movement.movementCashId= cash_movement.id',
      )
      .leftJoin(
        CreditMovement,
        'credit_movement',
        'account_movement.movementCreditId =credit_movement.id',
      )
      .leftJoin(
        DeferredMovement,
        'deferred_movement',
        'account_movement.movementDefferedId = deferred_movement.id',
      )
      .leftJoin(
        DisbursementMovement,
        'disbursement_movement',
        'account_movement.movementDisburmentId = disbursement_movement.id',
      )
      .leftJoin(
        NoteMovement,
        'note_movement',
        'account_movement.movementNoteId = note_movement.id',
      )
      .innerJoin(
        Movement,
        'movement',
        'cash_movement.movementId = movement.id or note_movement.movementId = movement.id or credit_movement.movementId = movement.id or disbursement_movement.movementId = movement.id or deferred_movement.movementId = movement.id',
      )
      .distinct(true)
      .where(
        `
        ${
          typeAccount === TypeAccountEnum.CLASS
            ? 'class.code'
            : typeAccount === TypeAccountEnum.GROUP
              ? 'group.code'
              : typeAccount === TypeAccountEnum.ACCOUNT
                ? 'account.code'
                : typeAccount === TypeAccountEnum.SUBACCOUNT
                  ? 'sub_account.code'
                  : typeAccount === TypeAccountEnum.AUXILIARY &&
                    'auxiliary.code'
        } = :code`,
        { code: code },
      )
      .groupBy('movement.date')
      .orderBy('movement.date', 'ASC');
    try {
      console.log(query.getQueryAndParameters());
      return await query.getRawMany();
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
