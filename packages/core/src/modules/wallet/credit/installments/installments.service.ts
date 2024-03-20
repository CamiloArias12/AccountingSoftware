import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindManyOptions, In, Repository } from 'typeorm';
import {} from './dto/update-installment.input';
import { Installment } from './installment.entity';
import { StateInstallment } from './dto/enum-types';

@Injectable()
export class InstallmentsService {
  constructor(
    @InjectRepository(Installment)
    private installmentRepository: Repository<Installment>,
    private dataSource: DataSource,
  ) {}
  private readonly subQuery = (date: Date) => {
    return this.dataSource
      .createQueryBuilder()
      .select('installment.state')
      .from(Installment, 'installment')
      .where('installment.installmentNumber=installments.installmentNumber-1')
      .andWhere('installment.id_credit=installments.id_credit')
      .andWhere(`MONTH(installments.paymentDate) = :month`, {
        month: date.getMonth() + 1,
      })
      .getQuery();
  };

  async finOneByCreditAndNumberInstallment(options: any): Promise<Installment> {
    return await this.installmentRepository.findOne(options);
  }
  async finOneByCredit(options: any): Promise<Installment[]> {
    return await this.installmentRepository.find(options);
  }

  async finMaxPayment(id: number): Promise<number> {
    return this.dataSource
      .getRepository(Installment)
      .maximum('installmentNumber', {
        state: In([StateInstallment.PAGADA, StateInstallment.PAGO_ANTICIPADO]),
        id_credit: id,
      });
  }
  async getNumberInstallments(idCredit: number): Promise<number> {
    return await this.installmentRepository.count({
      where: { id_credit: idCredit },
    });
  }

  async isCashRegister(credit: number, installment: number) {
    return this.installmentRepository.exist({
      where: {
        id_credit: credit,
        installmentNumber: installment,
        movement_cash: true,
      },
      relations: { movement_cash: true },
    });
  }

  async exist(options: FindManyOptions<Installment>) {
    return await this.installmentRepository.exist(options);
  }

  async updateState(
    id_credit: number,
    installmentNumber: number,
    options: any,
  ): Promise<Boolean> {
    try {
      await this.installmentRepository.update(
        { installmentNumber: installmentNumber, id_credit: id_credit },
        options,
      );
      return true;
    } catch (e) {
      /* handle error */
      return false;
    }
  }

  async delete(installments: Installment[]) {
    try {
      await this.installmentRepository.remove(installments);
    } catch (e) {
      /* handle error */
    }
  }
}
