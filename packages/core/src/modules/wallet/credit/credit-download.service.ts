import { Injectable } from '@nestjs/common';
import { CreditService } from './credit.service';
import * as Excel from 'exceljs';
import * as PdfPrinter from 'pdfmake';
import * as fs from 'fs';
import { Readable } from 'typeorm/platform/PlatformTools';

@Injectable()
export class CreditDownloadService {
  private header = [
    'Cuota',
    'Fecha de pago',
    'Balance inicial',
    'Pago programado',
    'Pago extra',
    'Pago total',
    'Capital',
    'Interés',
    'Balance final',
  ];

  private fonts: any = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique',
    },
  };
  constructor(private readonly creditService: CreditService) {}

  async downloadCreditXlsx(id: number) {
    const credit = await this.creditService.findOne({
      relations: {
        affiliate: {
          user: true,
        },
        typeCredit: {
          auxiliaries: {
            account: true,
          },
        },
        installments: true,
      },
      where: { id: id },
      order: { installments: { installmentNumber: 'ASC' } },
    });
    const workbook = new Excel.Workbook();
    workbook.created = new Date();
    const worksheet = workbook.addWorksheet('credito');
    worksheet.mergeCells('A1', 'H5');
    let titleRow = worksheet.getCell('B1');
    titleRow.value = 'TABLA DE AMORTIZACIÓN CRÉDITO FONCASTEL';
    titleRow.font = {
      name: 'Arial',
      size: 12,
      bold: true,
      color: { argb: '000000' },
    };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
    let myLogoImage = workbook.addImage({
      filename: 'logo.png',
      extension: 'png',
    });
    worksheet.mergeCells('I1', 'I5');
    worksheet.addImage(myLogoImage, 'I1:I5');
    const font = {
      name: 'Arial',
      bold: true,
      size: 10,
    };

    worksheet.mergeCells('A8', 'B8');
    let row = worksheet.getCell('B8');
    row.value = 'Nombre afiliado : ';
    row.font = font;
    worksheet.getCell('C8').value =
      `${credit.affiliate.user.name} ${credit.affiliate.user.lastName}`;

    worksheet.mergeCells('A9', 'B9');
    row = worksheet.getCell('B9');
    row.value = 'Identificación: ';
    row.font = font;
    worksheet.getCell('C9').value = credit.affiliate.identification;

    worksheet.mergeCells('A10', 'B10');
    row = worksheet.getCell('B10');
    row.value = 'Fecha : ';
    row.font = font;
    worksheet.getCell('C10').value = credit.startDate;

    worksheet.mergeCells('A11', 'B11');
    row = worksheet.getCell('B11');
    row.value = 'Fecha de descuento : ';
    row.font = font;
    worksheet.getCell('C11').value = credit.discountDate;

    row = worksheet.getCell('E8');
    row.value = 'Tipo de crédito : ';
    row.font = font;
    worksheet.getCell('F8').value = credit.typeCredit.name;

    row = worksheet.getCell('E9');
    row.value = 'Interés : ';
    row.font = font;
    worksheet.getCell('F9').value = credit.typeCredit.interest;

    row = worksheet.getCell('E10');
    row.value = 'Interés anual : ';
    row.font = font;
    worksheet.getCell('F10').value = credit.typeCredit.interest * 12;

    row = worksheet.getCell('H8');
    row.value = 'Valor crédito : ';
    row.font = font;
    worksheet.getCell('I8').value = credit.creditValue;

    row = worksheet.getCell('H9');
    row.value = 'No  cuotas : ';
    row.font = font;
    worksheet.getCell('I9').value = credit.installments.length;

    row = worksheet.getCell('H10');
    row.value = 'Pago mensual programado : ';
    row.font = font;
    worksheet.getCell('I10').value = credit.installments[0].scheduledPayment;
    worksheet.addRow([]);
    worksheet.addRow([]);
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

    credit.installments.map((installment) => {
      worksheet.addRow([
        installment.installmentNumber,
        installment.paymentDate,
        installment.initialBalance,
        installment.scheduledPayment,
        installment.extraPayment,
        installment.totalPayment,
        installment.capital,
        installment.interest,
        installment.finalBalance,
      ]);
    });
    const filePath = './uploads/credit.xlsx';
    return await new Promise<Buffer>(async (resolve, reject) => {
      await workbook.xlsx.writeFile(filePath);

      try {
        const xlsx = await new Promise<Buffer>((resolve, reject) => {
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
        resolve(xlsx);
      } catch (err) {
        reject(err);
      }
    });
  }

  async downloadCreditPdf(id: number) {
    const credit = await this.creditService.findOne({
      relations: {
        affiliate: {
          user: true,
        },
        typeCredit: {
          auxiliaries: {
            account: true,
          },
        },
        installments: true,
      },
      where: { id: id },
      order: { installments: { installmentNumber: 'ASC' } },
    });

    const body = [];
    const header = [];

    for (const installment of credit.installments) {
      const currentInstallment = [
        `${installment.installmentNumber}`,
        `${installment.paymentDate}`,
        `$ ${installment.initialBalance.toLocaleString()}`,
        `$ ${installment.scheduledPayment.toLocaleString()}`,
        `$ ${installment.extraPayment.toLocaleString()}`,
        `$ ${installment.totalPayment.toLocaleString()}`,
        `$ ${installment.capital.toLocaleString()}`,
        `$ ${installment.interest.toLocaleString()}`,
        `$ ${installment.finalBalance.toLocaleString()}`,
      ];
      body.push(currentInstallment);
    }

    for (let i = 0; i < this.header.length; i++) {
      header.push({
        text: this.header[i],
        alignment: 'center',
        style: 'tableHeader',
      });
    }
    console.log(header);
    const imageUrl = 'logo.png';
    const docDefinition = {
      content: [
        {
          image: imageUrl,
          width: 100,
        },
        {
          columns: [
            {
              width: '100%',
              bold: true,
              fontSize: 12,
              alignment: 'center',
              text: 'TABLA DE AMORTIZACIÓN CRÉDITO FONCASTEL ',
              margin: [0, 10, 0, 30],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Datos  asociado',
              width: '50%',
              bold: true,
              fontSize: 10,
              alignment: 'center',
              margin: [0, 0, 0, 10],
            },
            {
              text: 'Datos operación',
              width: '50%',
              bold: true,
              fontSize: 10,
              alignment: 'center',
              margin: [0, 0, 0, 10],
            },
          ],
        },

        {
          columns: [
            {
              text: 'Nombres: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `${credit.affiliate.user.name} ${credit.affiliate.user.lastName}`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
            {
              text: 'Valor del crédito: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `$ ${credit.creditValue.toLocaleString()}`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Identificación: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `${credit.affiliate.user.identification}`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
            {
              text: 'Tipo de crédito: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `${credit.typeCredit.name}`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Dirección : ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `${credit.affiliate.user.addressResidence}`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
            {
              text: 'Interés: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `${credit.interest} %`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Teléfono: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `${credit.affiliate.user.phone}`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
            {
              text: 'Interés anual: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `${credit.interest * 12} %`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Correo: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `${credit.affiliate.user.email}`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
            {
              text: 'Número de cuotas: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `${credit.installments.length}`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Salario: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `$ ${credit.affiliate.salary.toLocaleString()}`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
            {
              text: 'Cuota mensual: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `${credit.installments[0].scheduledPayment.toLocaleString()}`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 10],
            },
          ],
        },
        {
          columns: [
            {
              text: '',
              width: '25%',
              margin: [0, 0, 0, 10],
            },
            {
              text: '',
              width: '25%',
              margin: [0, 0, 0, 10],
            },
            {
              text: 'Fecha de descuento: ',
              width: '25%',
              bold: true,
              alignment: 'left',
              margin: [20, 0, 0, 10],
            },
            {
              text: `${credit.discountDate}`,
              width: '25%',
              alignment: 'right',
              margin: [0, 0, 20, 40],
            },
          ],
        },

        {
          table: {
            heights: 20,
            widths: [
              '6%',
              '13%',
              '13%',
              '13%',
              '10%',
              '12%',
              '10%',
              '10%',
              '14%',
            ],
            body: [header, ...body],
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
      ],

      styles: {
        tableHeader: {
          bold: true,
          fontSize: 9,
          color: 'white',
          fillColor: '#10417B',
        },
      },
      defaultStyle: {
        font: 'Helvetica',
        fontSize: 9,
      },
    };

    const printer = new PdfPrinter(this.fonts);
    const filePath = './uploads/credit.pdf';
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
