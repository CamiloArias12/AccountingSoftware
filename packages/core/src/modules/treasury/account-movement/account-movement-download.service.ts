import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AccountMovement } from './account-movement.entity';
import { User } from 'src/modules/parameterization/thirds/user/user.entity';
import { Auxiliary } from 'src/modules/parameterization/type-account/auxiliary/auxiliary.entity';
import { TypeAccount } from 'src/modules/parameterization/type-account/type-account.entity';
import { AccountTable, MovementAccount, MovementAndAccount } from './dto/types';
import { NatureEnum } from 'src/modules/parameterization/type-account/dto/enum-type';
import { Company } from 'src/modules/parameterization/thirds/company/company.entity';
import { IdentifierMovement } from '../movement/dto/enum-types';
import * as Excel from 'exceljs';

import * as PdfPrinter from 'pdfmake';
import * as fs from 'fs';
import { AccountMovementService } from './account-movement.service';
import { Readable } from 'typeorm/platform/PlatformTools';
@Injectable()
export class AccountMovementDownloadService {
  constructor(
    private readonly accountMovementService: AccountMovementService,
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
    'NUMERO DE MOVIMIENTO',
    'CONCEPTO',
    'CODIGO CUENTA',
    'NOMBRE CUENTA',
    'IDENTIFICACION TERCERO',
    'NOMBRE TERCERO',
    'SALDO ANTERIOR',
    'DEBE',
    'HABER',
    'SALDO',
  ];

 

  async downloadCreditPdf(id: string) {
    const movement = await this.accountMovementService.findMovements([id]);
    console.log(movement[0].movement);
    const body = [];

    const bodyMovement = [
      [
        `${movement[0].movement.id}`,
        `${movement[0].movement.date}`,
        `${movement[0].movement.concept}`,
        `${movement[0].movement.state ? 'Activo' : 'Inactivo'}`,
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
    /* handle error */

    return await new Promise<Buffer>((resolve, reject) => {
      const pdfDoc = printer.createPdfKitDocument(docDefinition, {});
      pdfDoc.pipe(fs.createWriteStream(filePath));

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

  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }
}
