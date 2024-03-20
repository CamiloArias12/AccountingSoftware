import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AccountMovement } from './account-movement.entity';
import { User } from 'src/modules/parameterization/thirds/user/user.entity';
import { Auxiliary } from 'src/modules/parameterization/type-account/auxiliary/auxiliary.entity';
import { TypeAccount } from 'src/modules/parameterization/type-account/type-account.entity';
import {
  AccountTable,
  BookAuxiliary,
  BookAuxiliaryData,
  MovementAccount,
  MovementAndAccount,
} from './dto/types';
import { NatureEnum } from 'src/modules/parameterization/type-account/dto/enum-type';
import { Company } from 'src/modules/parameterization/thirds/company/company.entity';
import { IdentifierMovement } from '../movement/dto/enum-types';
import { CreditMovement } from '../credit-movement/credit-movement.entity';
import { Movement } from '../movement/movement.entity';
import { DeferredMovement } from '../deferred-movement/deferred-movement.entity';
import { DisbursementMovement } from '../disbursement-movement/disbursement-movement.entity';
import * as Excel from 'exceljs';

import * as PdfPrinter from 'pdfmake';
import * as fs from 'fs';
import { query } from 'express';
import { CashRegisterMovement } from '../cash-register-movement/cash-register-movement.entity';
import { MovementService } from '../movement/movement.service';
import { NoteMovement } from '../note-movement/note-movement.entity';
import { InputSearchMovement } from '../movement/dto/types';
@Injectable()
export class AccountMovementService {
  constructor(
    @InjectRepository(AccountMovement)
    private readonly accountRepository: Repository<AccountMovement>,
    private readonly movementService: MovementService,
    private dataSource: DataSource,
  ) {}
  private fonts: any = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique',
    },
  };

  private header = [
    'FECHA MOVIMIENTO',
    'TIPO DE DOCUMENTO CONTABLE',
    'NÚMERO DE MOVIMIENTO',
    'CONCEPTO',
    'CÓDIGO CUENTA',
    'NOMBRE CUENTA',
    'IDENTIFICACIÓN TERCERO',
    'NOMBRE TERCERO',
    'SALDO ANTERIOR',
    'DEBE',
    'HABER',
    'SALDO',
  ];
  private readonly query = this.dataSource
    .createQueryBuilder()
    .addSelect('user.identification', 'identification')
    .addSelect('user.name ', 'name')
    .addSelect('user.lastName', 'lastName')
    .addSelect('type_account.code', 'code')
    .addSelect('type_account.name', 'nameAccount')
    .addSelect('SUM(account_movement.value)', 'value')
    .addSelect('account_movement.nature', 'nature')
    .addSelect('company.identification', 'numberIdentification')
    .addSelect('company.name', 'socialReason')
    .from(AccountMovement, 'account_movement')
    .leftJoin(
      Company,
      'company',
      'account_movement.companyIdentification=company.identification',
    )
    .leftJoin(
      User,
      'user',
      'account_movement.userIdentification= user.identification',
    )

    .leftJoin(
      Auxiliary,
      'auxiliary',
      'account_movement.auxiliaryCode=auxiliary.code',
    )
    .leftJoin(TypeAccount, 'type_account', 'auxiliary.code=type_account.code')
    .addGroupBy('account_movement.auxiliaryCode')
    .addGroupBy('account_movement.userIdentification')
    .addGroupBy('account_movement.companyIdentification')
    .addGroupBy('account_movement.nature')
    .orderBy('account_movement.nature', 'DESC');

  private readonly queryAccount = this.dataSource
    .createQueryBuilder()
    .addSelect('user.identification', 'identification')
    .addSelect('user.name', 'name')
    .addSelect('user.lastName', 'lastName')
    .addSelect('type_account.code', 'code')
    .addSelect('type_account.name', 'nameAccount')
    .addSelect('account_movement.value', 'value')
    .addSelect('account_movement.nature', 'nature')
    .addSelect('company.identification', 'numberIdentification')
    .addSelect('company.name', 'socialReason')
    .addSelect('movement.id', 'idMovement')
    .addSelect('movement.concept', 'concept')
    .addSelect('movement.date', 'date')
    .addSelect('account_movement.movementCashId', 'cash')
    .addSelect('account_movement.movementDisburmentId', 'disburment')
    .addSelect('account_movement.movementCreditId', 'credit')
    .addSelect('account_movement.movementDefferedId', 'deferred')
    .addSelect('account_movement.movementNoteId', 'note')
    .from(AccountMovement, 'account_movement')
    .leftJoin(
      Company,
      'company',
      'account_movement.companyIdentification = company.identification',
    )
    .leftJoin(
      User,
      'user',
      'account_movement.userIdentification = user.identification',
    )
    .leftJoin(
      Auxiliary,
      'auxiliary',
      'account_movement.auxiliaryCode = auxiliary.code',
    )
    .leftJoin(
      TypeAccount,
      'type_account',
      'auxiliary.code = type_account.code',
    );
  private queryBalancePrevius = this.dataSource
    .createQueryBuilder()

    .addSelect('user.identification', 'identification')
    .addSelect('user.name', 'name')
    .addSelect('user.lastName', 'lastName')
    .addSelect('type_account.code', 'code')
    .addSelect('type_account.name', 'nameAccount')
    .addSelect(
      'SUM(CASE WHEN account_movement.nature = "Debito" THEN value ELSE -value END)',
      'previus_balance',
    )
    .addSelect('company.identification', 'numberIdentification')
    .addSelect('company.name', 'socialReason')
    .from(AccountMovement, 'account_movement')
    .leftJoin(
      Company,
      'company',
      'account_movement.companyIdentification = company.identification',
    )
    .leftJoin(
      User,
      'user',
      'account_movement.userIdentification = user.identification',
    )
    .leftJoin(
      Auxiliary,
      'auxiliary',
      'account_movement.auxiliaryCode = auxiliary.code',
    )
    .leftJoin(
      TypeAccount,
      'type_account',
      'auxiliary.code = type_account.code',
    );

  async find(data: InputSearchMovement): Promise<Movement[]> {
    const query = this.dataSource
      .createQueryBuilder()
      .addSelect('movement.id', 'id')
      .addSelect('movement.concept', 'concept')
      .addSelect('movement.date', 'date')
      .addSelect('movement.accounting', 'accounting')
      .addSelect('movement.state', 'state')
      .from(AccountMovement, 'account_movement')
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
        `movement.date>= :startDate and  movement.date<= :endDate 
    ${data.user ? 'and account_movement.userIdentification = :user' : ''}
    ${data.company ? 'and account_movement.companyIdentification = :company' : ''}
    ${data.idAccount ? 'and account_movement.auxiliaryCode = :idAccount' : ''}
    ${data.concept ? 'and movement.concept LIKE :concept ' : ''}
    ${data.name ? 'and movement.id LIKE :name ' : ''}

      `,
        {
          endDate: data.endDate.toISOString().split('T', 1),
          company: data.company,
          user: data.user,
          idAccount: data.idAccount,
          concept: `%${data?.concept}%`,

          name: `%${data?.name?.toUpperCase()}%`,
          startDate: data.startDate.toISOString().split('T', 1),
        },
      );

    console.log(query.getQueryAndParameters());
    return query.getRawMany();
  }

  async create(accounts: AccountMovement[]) {
    try {
      return this.accountRepository.save(accounts);
    } catch (e) {
      /* handle error */
    }
  }

  async accountBalance(data: BookAuxiliary) {
    const cash_movements = await this.queryBalancePrevius
      .clone()
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
        'cash_movement.movementId = movement.id or note_movement.movementId = movement.id  or  credit_movement.movementId = movement.id or disbursement_movement.movementId = movement.id or deferred_movement.movementId = movement.id ',
      )
      /*
      .where('movement.date< :startDate', {
        startDate: date.toISOString().split('T', 1),
      })*/
      .where(
        `movement.date < :startDate
      ${data.user ? 'and account_movement.userIdentification = :user' : ''}
    ${data.company ? 'and account_movement.companyIdentification = :company' : ''}
      `,
        {
          startDate: data.startDate.toISOString().split('T', 1),
          company: data.company,
          user: data.user,
        },
      )
      .addGroupBy('account_movement.auxiliaryCode')
      .addGroupBy('account_movement.userIdentification')
      .addGroupBy('account_movement.companyIdentification')
      .getRawMany();

    console.log(cash_movements);
    return cash_movements;
  }
  async findMovements(movements: string[]): Promise<MovementAndAccount[]> {
    console.log('book');
    let query: MovementAccount[] = [];
    const movementsAccount: MovementAndAccount[] = [];
    for await (const id_movement of movements) {
      const accountTable: AccountTable[] = [];
      if (id_movement.includes(IdentifierMovement.CREDIT)) {
        query = await this.query
          .clone()
          .leftJoin(
            CreditMovement,
            'credit_movement',
            'account_movement.movementCreditId=credit_movement.id',
          )
          .where('credit_movement.movementId= :movement', {
            movement: id_movement,
          })
          .getRawMany();
      }

      if (id_movement.includes(IdentifierMovement.DEFERRED)) {
        query = await this.query
          .clone()
          .leftJoin(
            DeferredMovement,
            'deferred_movement',
            'account_movement.movementDefferedId=deferred_movement.id',
          )
          .where('deferred_movement.movementId= :movement', {
            movement: id_movement,
          })
          .getRawMany();
        console.log(query);
      }

      if (id_movement.includes(IdentifierMovement.DISBURSEMENT)) {
        query = await this.query
          .clone()
          .leftJoin(
            DisbursementMovement,
            'disbursement_movement',
            'account_movement.movementDisburmentId=disbursement_movement.id',
          )
          .where('disbursement_movement.movementId= :movement', {
            movement: id_movement,
          })
          .getRawMany();
        console.log(query);
      }
      if (id_movement.includes(IdentifierMovement.CASH_REGISTER)) {
        query = await this.query
          .clone()
          .leftJoin(
            CashRegisterMovement,
            'cash_movement',
            'account_movement.movementCashId=cash_movement.id',
          )
          .where('cash_movement.movementId= :movement', {
            movement: id_movement,
          })
          .getRawMany();
      }
      if (id_movement.includes(IdentifierMovement.OTHER)) {
        query = await this.query
          .clone()
          .leftJoin(
            NoteMovement,
            'note',
            'account_movement.movementNoteId=note.id',
          )
          .where('note.movementId= :movement', {
            movement: id_movement,
          })
          .getRawMany();
      }

      let totalCredit = 0;
      let totalDebit = 0;
      if (query.length > 0) {
        for (const data of query) {
          totalCredit +=
            data.nature === NatureEnum.CREDIT ? Number(data.value) : 0;
          totalDebit +=
            data.nature === NatureEnum.DEBIT ? Number(data.value) : 0;
          accountTable.push({
            identificationThird: data.identification
              ? data.identification
              : data.numberIdentification,
            nameThird: data.name
              ? `${data.lastName} ${data.name}`
              : data.socialReason,
            nameAccount: data.nameAccount,
            code: data.code,
            credit: data.nature === NatureEnum.CREDIT ? data.value : 0,
            debit: data.nature === NatureEnum.DEBIT ? data.value : 0,
          });
        }
        accountTable.push({
          credit: totalCredit,
          debit: totalDebit,
          code: null,
          identificationThird: null,
          nameThird: 'Total',
          nameAccount: null,
        });
        const movement = await this.movementService.findOne({
          where: { id: id_movement },
        });
        movementsAccount.push({ account: accountTable, movement: movement });
      }
    }
    return movementsAccount;
  }

  async getMovementsBook(data: BookAuxiliary) {
    const query: MovementAccount[] = await this.queryAccount
      .clone()
      .leftJoin(
        DisbursementMovement,
        'disbursement_movement',
        'account_movement.movementDisburmentId = disbursement_movement.id',
      )
      .leftJoin(
        CashRegisterMovement,
        'cash_movement',
        'account_movement.movementCashId = cash_movement.id',
      )
      .leftJoin(
        DeferredMovement,
        'deferred_movement',
        'account_movement.movementDefferedId = deferred_movement.id',
      )
      .leftJoin(
        CreditMovement,
        'credit_movement',
        'account_movement.movementCreditId =credit_movement.id',
      )
      .leftJoin(
        NoteMovement,
        'note_movement',
        'account_movement.movementNoteId =note_movement.id',
      )
      .innerJoin(
        Movement,
        'movement',
        'cash_movement.movementId = movement.id or note_movement.movementId = movement.id  or  credit_movement.movementId = movement.id or disbursement_movement.movementId = movement.id or deferred_movement.movementId = movement.id ',
      )
      .where('movement.date>= :startDate', {
        startDate: data.startDate.toISOString().split('T', 1),
      })
      .andWhere(
        `movement.date<= :endDate
      ${data.user ? 'and account_movement.userIdentification = :user' : ''}
    ${data.company ? 'and account_movement.companyIdentification = :company' : ''}
      `,
        {
          endDate: data.endDate.toISOString().split('T', 1),
          company: data.company,
          user: data.user,
        },
      )

      .getRawMany();
    return query;
  }

  async getBook(data: BookAuxiliary) {
    const queryMovement = await this.getMovementsBook(data);
    const queryAccount = await this.accountBalance(data);
    const response: BookAuxiliaryData[] = [];
    queryMovement.map((movement: MovementAccount) => {
      response.push({
        date: movement.date,
        typeMovement: movement.cash
          ? 'RECIBOS DE CAJA'
          : movement.deferred
            ? 'DIFERIDOS '
            : movement.disburment
              ? 'COMPROBANTE DE EGRESO'
              : movement.credit
                ? 'CREDITO'
                : movement.note && 'OTRO',
        idMovement: movement.idMovement,
        concept: movement.concept,
        code: movement.code,
        nameAccount: movement.nameAccount,
        identificationThird: movement.identification
          ? movement.identification
          : movement.numberIdentification,
        nameThird: movement.name
          ? `${movement.name} ${movement.lastName}`
          : movement.socialReason,
        previusBalance: 0,
        debit: movement.nature === NatureEnum.DEBIT ? movement.value : 0,
        credit: movement.nature === NatureEnum.CREDIT ? movement.value : 0,
        total:
          movement.nature === NatureEnum.CREDIT
            ? -movement.value
            : movement.value,
      });
    });

    queryAccount.map((movement: any) => {
      response.push({
        code: movement.code,
        nameAccount: movement.nameAccount,
        identificationThird: movement.identification
          ? movement.identification
          : movement.numberIdentification,
        nameThird: movement.name
          ? `${movement.name} ${movement.lastName}`
          : movement.socialReason,
        previusBalance: movement.previus_balance,
        total: Number(movement.previus_balance),
        credit: 0,
        debit: 0,
      });
    });

    return response;
  }
  async generateBook(data: BookAuxiliary) {
    const queryMovement = await this.getMovementsBook(data);
    const queryAccount = await this.accountBalance(data);
    const workbook = new Excel.Workbook();
    workbook.created = new Date();
    const worksheet = workbook.addWorksheet('credito');
    worksheet.mergeCells('A1', 'H5');
    let titleRow = worksheet.getCell('B1');
    titleRow.value = 'Libro auxiliar';
    titleRow.font = {
      name: 'Arial',
      size: 12,
      bold: true,
      color: { argb: '000000' },
    };

    let headerRow = worksheet.addRow(this.header);
    headerRow.eachCell((cell, number) => {
      cell.style = {
        alignment: { vertical: 'middle', horizontal: 'center' },
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '10417B' },
          bgColor: { argb: '' },
        },
        font: {
          name: 'Arial',
          bold: true,
          color: { argb: 'FFFFFF' },
          size: 10,
        },
      };
      if (number === 1) {
        worksheet.getColumn(number).width = 10;
      } else {
        worksheet.getColumn(number).width = 24;
      }
    });

    queryMovement.map((movement: MovementAccount) => {
      worksheet.addRow([
        movement.date,
        movement.cash
          ? 'RECIBOS DE CAJA'
          : movement.deferred
            ? 'DIFERIDOS '
            : movement.disburment
              ? 'COMPROBANTE DE EGRESO'
              : movement.credit
                ? 'CREDITO'
                : movement.note && 'OTRO',
        movement.idMovement,
        movement.concept,
        movement.code,
        movement.nameAccount,
        movement.identification
          ? movement.identification
          : movement.numberIdentification,
        movement.name
          ? `${movement.name} ${movement.lastName}`
          : movement.socialReason,
        '0',
        movement.nature === NatureEnum.DEBIT ? movement.value : 0,
        movement.nature === NatureEnum.CREDIT ? movement.value : 0,
        movement.nature === NatureEnum.CREDIT
          ? -movement.value
          : movement.value,
      ]);
    });

    queryAccount.map((movement: any) => {
      console.log(movement);
      console.log(
        Number(movement.previus_balance) +
          Number(movement.debit_balance) -
          Number(movement.credit_balance),
        'operation',
      );
      worksheet.addRow([
        '',
        '',
        '',
        '',
        movement.code,
        movement.nameAccount,
        movement.identification
          ? movement.identification
          : movement.numberIdentification,
        movement.name
          ? `${movement.name} ${movement.lastName}`
          : movement.socialReason,
        movement.previus_balance,
        0,
        0,
        Number(movement.previus_balance),
      ]);
    });

    const filePath = './uploads/book.xlsx';
    await workbook.xlsx.writeFile(filePath);
    return new StreamableFile(fs.createReadStream(filePath));
  }

  async downloadCreditPdf(id: string) {
    const movement = await this.findMovements([id]);
    console.log(movement[0].movement);
    try {
      const body = [];

      const bodyMovement = [
        [
          `${movement[0].movement.id}`,
          `${movement[0].movement.date}`,
          `${movement[0].movement.concept}`,
          `${movement[0].movement.state}`,
          `${movement[0].movement.accounting}`,
        ],
      ];
      for (const account_movement of movement[0].account) {
        const currentInstallment = [
          `${account_movement.code ? account_movement.code : ''}`,
          `${account_movement.nameAccount ? account_movement.nameAccount : ''}`,
          `${
            account_movement.identificationThird
              ? account_movement.identificationThird
              : ''
          }`,
          `${account_movement.nameThird}`,
          `$ ${account_movement.debit.toLocaleString()}`,
          `$ ${account_movement.credit.toLocaleString()}`,
        ];
        body.push(currentInstallment);
      }

      const docDefinition = {
        content: [
          {
            table: {
              heights: 20,
              widths: ['20%', '20%', '20%', '20%', '20%'],
              body: [
                [
                  { text: 'Id', style: 'tableHeader', alignment: 'center' },
                  { text: 'Fecha', style: 'tableHeader', alignment: 'center' },
                  {
                    text: 'Concepto',
                    style: 'tableHeader',
                    alignment: 'center',
                  },
                  {
                    text: 'Estado',
                    style: 'tableHeader',
                    alignment: 'center',
                  },
                  {
                    text: 'Contabilización',
                    style: 'tableHeader',
                    alignment: 'center',
                  },
                ],
                ...bodyMovement,
              ],
            },
            layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return rowIndex % 2 === 0 ? '#F2F5FA' : null;
              },
              padding: [0, 4, 0, 4],
              defaultBorder: false,
              border: [false, false, false, false],
            },
          },

          {
            table: {
              heights: 20,
              widths: ['16%', '18%', '16%', '18%', '16%', '16%'],
              body: [
                [
                  {
                    text: 'Cuenta',
                    style: 'tableHeader',
                    colSpan: 2,
                    alignment: 'center',
                  },
                  {},
                  {
                    text: 'Tercero',
                    style: 'tableHeader',
                    colSpan: 2,
                    alignment: 'center',
                  },
                  {},
                  {
                    text: 'Saldo',
                    style: 'tableHeader',
                    colSpan: 2,
                    alignment: 'center',
                  },

                  {},
                ],
                [
                  { text: 'Código', style: 'tableHeader', alignment: 'center' },
                  { text: 'Nombre', style: 'tableHeader', alignment: 'center' },
                  {
                    text: 'Identificación',
                    style: 'tableHeader',
                    alignment: 'center',
                  },
                  {
                    text: 'Nombres',
                    style: 'tableHeader',
                    alignment: 'center',
                  },
                  {
                    text: 'Débito',
                    style: 'tableHeader',
                    alignment: 'center',
                  },
                  {
                    text: 'Crédito',
                    style: 'tableHeader',
                    alignment: 'center',
                  },
                ],
                ...body,
              ],
            },
            layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return rowIndex % 2 === 0 ? '#F2F5FA' : null;
              },
              padding: [0, 0, 0, 0],
              defaultBorder: false,
              border: [false, false, false, false],
            },
          },
        ],

        styles: {
          tableHeader: {
            bold: true,
            fontSize: 9,
            color: 'white',
            fillColor: '#10417B',
            defaultBorder: false,
            border: [false, false, false, false],
          },
        },
        defaultStyle: {
          font: 'Helvetica',
          fontSize: 9,
        },
      };

      const printer = new PdfPrinter(this.fonts);
      const filePath = './uploads/account_movement.pdf';
      const pdfDoc = printer.createPdfKitDocument(docDefinition, {});
      await pdfDoc.pipe(fs.createWriteStream(filePath));
      await pdfDoc.end();
    } catch (e) {
      console.log(e);
      /* handle error */
    }
  }
  /*
    return await new Promise<Buffer>((resolve, reject) => {
      const chunks = [];
      pdfDoc.on('readable', () => {
        let chunk: string;
        while ((chunk = pdfDoc.read()) !== null) {
          chunks.push(chunk);
        }
      });

      pdfDoc.on('end', async () => {
        Buffer.concat(chunks);
        try {
          const pdf = await new Promise<Buffer>((resolve, reject) => {
            try {
              fs.readFile(filePath, {}, (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                  }
                  resolve(data);
                }
              });
            } catch (err) {
              reject(err);
            }
          });
          resolve(pdf);
        } catch (err) {
          reject(err);
        }
      });
      pdfDoc.end();
    });
  }
  */
}
