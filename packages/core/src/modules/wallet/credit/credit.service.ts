import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { Credit } from './credit.entity';
import { addMonths, addDays, isLeapYear } from 'date-fns';
import { CreateCreditInput } from './dto/create-credit.input';
import { CreateInstallment } from './installments/dto/create-installment.input';
import { AffiliateService } from 'src/modules/parameterization/thirds/affiliate/affiliate.service';
import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { TypeCredit } from 'src/modules/parameterization/type-credit/type-credit.entity';
import { TypeCreditService } from 'src/modules/parameterization/type-credit/type-credit.service';
import { ViewCredit } from './credit-view.entity';
import { PaymentMethods, RefinanceCredit, StateCredit } from './dto/enum-types';
import { User } from 'src/modules/parameterization/thirds/user/user.entity';
import { Installment } from './installments/installment.entity';
import { StateInstallment } from './installments/dto/enum-types';
import { Movement } from 'src/modules/treasury/movement/movement.entity';
import { CreditMovement } from 'src/modules/treasury/credit-movement/credit-movement.entity';
import { AccountMovement } from 'src/modules/treasury/account-movement/account-movement.entity';
import { CreditMovementService } from 'src/modules/treasury/credit-movement/credit-movement.service';
import { TypeAccountCreditEnum } from 'src/modules/parameterization/type-credit/dto/enum-types';
import { UpdateCreditInput } from './dto/update-credit.input';
import { InstallmentsService } from './installments/installments.service';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
    private affiliateService: AffiliateService,
    private typeCreditService: TypeCreditService,
    private dataSource: DataSource,
    @Inject(forwardRef(() => CreditMovementService))
    private creditMovementService: CreditMovementService,
    private installmentService: InstallmentsService,
  ) {}

  async create(
    createCreditInput: CreateCreditInput,
    isCredti?: boolean,
  ): Promise<Boolean | Credit> {
    const newCredit: Credit = new Credit(createCreditInput);
    const affiliate: Affiliate = await this.affiliateService.findOne(
      createCreditInput.affiliateId,
    );
    const typeCredit: TypeCredit = await this.typeCreditService.findOne(
      createCreditInput.idTypeCredit,
    );
    const creditMovement: CreditMovement = new CreditMovement();
    const accountMovemnts: AccountMovement[] = [];
    const movement: Movement = new Movement();
    movement.date = createCreditInput.startDate;
    movement.concept = createCreditInput.concept;
    for (const account of typeCredit.auxiliaries) {
      if (account.typeAccount === TypeAccountCreditEnum.CAPITAL) {
        const accounMovement: AccountMovement = new AccountMovement();
        accounMovement.auxiliary = account.account;
        accounMovement.value = createCreditInput.creditValue;
        accounMovement.user = affiliate.user;
        accounMovement.nature = account.nature;
        accountMovemnts.push(accounMovement);
      }
    }
    creditMovement.movement = movement;
    creditMovement.account_movement = accountMovemnts;
    if (affiliate && typeCredit) {
      newCredit.typeCredit = typeCredit;
      newCredit.affiliate = affiliate;
      try {
        const credit = await this.creditRepository.save(newCredit);
        creditMovement.credit = credit;
        movement.id = `CREDITO_${credit.id}`;
        await this.creditMovementService.createCreditMovement(creditMovement);
        if (isCredti) {
          return credit;
        } else {
          return true;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }

  async createRefinace(
    id: number,
    createCreditInput: CreateCreditInput,
  ): Promise<Boolean> {
    const isRefinance = await this.isRefinance(id);
    if (isRefinance.state) {
      const query = await this.installmentService.finOneByCredit({
        where: { id_credit: id, state: StateInstallment.PENDIENTE },
      });
      console.log(query);
      try {
        const credit = (await this.create(createCreditInput, true)) as Credit;

        console.log(credit);
        if (credit) {
          const credit_refinance = await this.findOne({ where: { id: id } });
          for await (const installment of query) {
            await this.installmentService.updateState(
              installment.id_credit,
              installment.installmentNumber,
              { state: StateInstallment.REFINANCIADA },
            );
          }
          await this.updateRefinance(credit.id, credit_refinance);
          await this.updateState(id, StateCredit.REFINANCIADO);
        }
        return true;
      } catch (e) {
        /* handle error */
        console.log(e);
        return false;
      }
    } else {
      return false;
    }
  }

  async findAll(): Promise<ViewCredit[]> {
    console.log(await this.countCreditByMonth());
    return await this.dataSource.manager.find(ViewCredit);
  }

  async updateRefinance(id: number, credit: Credit) {
    return this.creditRepository.update(
      { id: id },
      { credit_refinance: credit },
    );
  }

  async update(data: UpdateCreditInput): Promise<Boolean> {
    try {
      const credit = await this.findOne({
        where: { id: data.idCredit },
        relations: { installments: true },
      });
      const installmentsDelete = [
        ...credit.installments.slice(
          data.installments.length,
          credit.installments.length,
        ),
      ];
      if (installmentsDelete.length > 0) {
        await this.installmentService.delete(installmentsDelete);
      }
      credit.installments = data.installments as Installment[];
      for (const installment of credit.installments) {
        installment.id_credit = data.idCredit;
      }

      await this.creditRepository.save(credit);

      return true;
    } catch (e) {
      console.log(e);
      /* handle error */
    }
  }

  async countAll() {
    return await this.creditRepository.count();
  }

  async sumAll() {
    const query = await this.creditRepository.sum('creditValue');
    return query ? query : 0;
  }

  async countAllByState(state: StateCredit) {
    console.log(await this.countAllByTypeCredit());
    return await this.creditRepository.count({ where: { state: state } });
  }
  async countAllByTypeCredit() {
    return this.creditRepository.count({ where: { typeCredit: { id: 1 } } });
  }

  async countAllByAffiliate(id: number) {
    return this.creditRepository.count({
      where: { affiliate: { identification: id } },
    });
  }

  async updateState(id: number, state: StateCredit): Promise<Boolean> {
    try {
      await this.creditRepository.update({ id: id }, { state: state });
      return true;
    } catch (e) {
      /* handle error */
      return false;
    }
  }

  async countCreditAffiliate(identification: number) {
    return this.creditRepository.count({
      where: { affiliate: { identification: identification } },
      relations: { affiliate: true },
    });
  }
  async findOne(options: FindOneOptions<Credit>): Promise<Credit> {
    return this.creditRepository.findOne(options);
  }

  /*
   * relations: {
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

    */
  async delete(id: number): Promise<Boolean> {
    try {
      const credit = await this.findOne({
        relations: {
          credit_movement: { movement: true },
          credit_refinance: true,
        },
        where: { id: id },
      });
      if (credit.state === StateCredit.APROBADO) {
        await this.creditRepository.remove(credit);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async isRefinance(id: number): Promise<ResponseGraphql> {
    const query = await this.findOne({
      where: {
        id: id,
        state: StateCredit.CURSO,
      },
      relations: {
        installments: { movement_deferred: true },
      },
    });
    if (query) {
      for (let i = 0; i < query.installments.length; i++) {
        if (
          query.installments[i].movement_deferred &&
          query.installments[i].state === StateInstallment.PENDIENTE
        ) {
          return {
            state: false,
            message: `El credito no se puede refinanciar porque tiene diferidos en coutas pendientes`,
          };
        }
      }
      return {
        state: true,
        message: 'El credito se puede renfinaciar',
      };
    }
    return {
      state: false,
      message: 'El credito no se puede refinanciar ',
    };
  }

  async findAllCredit(): Promise<Credit[]> {
    return this.creditRepository.find();
  }
  async refinance(id: number): Promise<RefinanceCredit> {
    const query = await this.dataSource
      .createQueryBuilder()
      .addSelect('user.identification', 'identification')
      .addSelect('user.name ', 'name')
      .addSelect('user.lastName', 'lastName')
      .addSelect('credit.interest ', 'interest')
      .addSelect('typeCredit.name', 'typeCredit')
      .addSelect('typeCredit.id', 'idTypeCredit')
      .addSelect('installments.finalBalance', 'previewBalance')
      .from(Installment, 'installments')
      .leftJoin(Credit, 'credit', 'installments.id_credit=credit.id')
      .leftJoin(
        Affiliate,
        'affiliate',
        'credit.affiliateIdentification= affiliate.identification',
      )
      .leftJoin(User, 'user', 'affiliate.identification= user.identification')
      .leftJoin(TypeCredit, 'typeCredit', 'credit.typeCreditId=typeCredit.id ')
      .where('installments.state= :stateB', {
        stateB: StateInstallment.PAGO_ANTICIPADO,
      })

      .orWhere('installments.state= :state', { state: StateInstallment.PAGADA })
      .andWhere('credit.id = :id', { id: id })
      .orderBy('installments.installmentNumber', 'DESC')
      .getRawMany();
    console.log(query);
    return {
      ...query[0],
      nameAffiliate: `${query[0].name} ${query[0].lastName}`,
    };
  }
  async countCreditByMonth() {
    const query = await this.dataSource
      .createQueryBuilder()
      .addSelect(
        'YEAR(credit.startDate) AS year, MONTH(credit.startDate) AS month',
      )
      .addSelect('COUNT(*) AS count')
      .from(Credit, 'credit')
      .groupBy('YEAR(credit.startDate), MONTH(credit.startDate)')
      .orderBy('YEAR(credit.startDate), MONTH(credit.startDate)')
      .getRawMany();

    const values = [];
    query.map((data) => {
      values.push([
        new Date(data.year, data.month - 1, 1).getTime(),
        Number(data.count),
      ]);
    });
    console.log(values);
    return values;
  }

  interestCalculate(interest: number, methodPayment: number) {
    return (interest * 12) / methodPayment;
  }
  async amortizationTableGenerate(
    dateCredit: Date,
    datePayment: Date,
    valueLoan: number,
    method: PaymentMethods,
    interest: number,
    installments: number,
  ): Promise<CreateInstallment[]> {
    const array: CreateInstallment[] = [];
    let loanPartial = valueLoan;
    if (method !== PaymentMethods.singlePayment) {
      const methodPayment =
        this.interestCalculate(
          interest,
          (method === PaymentMethods.monthly ? 12 : 1) * 100,
        ) / (method === PaymentMethods.biannual ? 2 : 1);
      const valueInstallment = this.pmt(valueLoan, installments, methodPayment);
      for (let i = 0; i < installments; i++) {
        const interestValue =
          loanPartial *
          ((interest * 12) /
            100 /
            (method === PaymentMethods.annual
              ? 1
              : method === PaymentMethods.monthly
              ? 12
              : 2));
        const finalBalance = loanPartial - (valueInstallment - interestValue);
        console.log(method);
        array.push({
          installmentNumber: i + 1,
          paymentDate: addMonths(
            dateCredit,
            i === 0
              ? i
              : i *
                  (method === PaymentMethods.monthly
                    ? 1
                    : method === PaymentMethods.annual
                    ? 12
                    : 6),
          ),
          initialBalance: Math.round(loanPartial),
          scheduledPayment: Math.round(valueInstallment),
          extraPayment: 0,
          totalPayment: Math.round(valueInstallment),
          capital: Math.round(valueInstallment - interestValue),
          interest: Math.round(interestValue),
          finalBalance: Math.round(finalBalance),
        });

        loanPartial = loanPartial - (valueInstallment - interestValue);
      }

      return array;
    } else {
      array.push({
        installmentNumber: 1,
        paymentDate: datePayment,
        initialBalance: valueLoan,
        scheduledPayment: Math.round(
          valueLoan +
            ((interest * 12) / 100 / 365) *
              this.calculateDaysBetweenDates(dateCredit, datePayment) *
              valueLoan,
        ),
        extraPayment: 0,
        totalPayment: Math.round(
          valueLoan +
            ((interest * 12) / 100 / 365) *
              this.calculateDaysBetweenDates(dateCredit, datePayment) *
              valueLoan,
        ),
        capital: valueLoan,
        interest: Math.round(
          ((interest * 12) / 100 / 365) *
            this.calculateDaysBetweenDates(dateCredit, datePayment) *
            valueLoan,
        ),
        finalBalance: 0,
      });

      return array;
    }
  }
  calculateDaysBetweenDates(startDate: Date, endDate: Date): number {
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (24 * 60 * 60 * 1000);
    return Math.round(daysDifference);
  }
  async amortizationTableGenerateThree(
    dateCredit: Date,
    valueLoan: number,
    interest: number,
    method: PaymentMethods,
    valuePayment: number,
  ): Promise<CreateInstallment[]> {
    console.log(method);
    const array: CreateInstallment[] = [];
    let flag = false;
    let loanPartial = valueLoan;
    let valueInstallment = valuePayment;
    let interestValue =
      loanPartial *
      ((interest * 12) /
        100 /
        (method === PaymentMethods.annual
          ? 1
          : method === PaymentMethods.monthly
          ? 12
          : 2));
    console.log(loanPartial);
    let finalBalance = loanPartial - (valueInstallment - interestValue);
    for (let i = 0; flag === false; i++) {
      console.log(interestValue);
      if (i > 500) {
        console.log(array);
        i = 0;
        return [];
      }
      array.push({
        installmentNumber: i + 1,
        paymentDate: addMonths(
          dateCredit,
          i === 0
            ? i
            : i *
                (method === PaymentMethods.monthly
                  ? 12
                  : method === PaymentMethods.annual
                  ? 1
                  : 6),
        ),

        initialBalance: Math.round(loanPartial),
        scheduledPayment: Math.round(valueInstallment),
        extraPayment: 0,
        totalPayment: Math.round(valueInstallment),
        capital: Math.round(valueInstallment - interestValue),
        interest: Math.round(interestValue),
        finalBalance: Math.round(finalBalance),
      });

      loanPartial = finalBalance + 0;
      interestValue =
        loanPartial *
        ((interest * 12) /
          100 /
          (method === PaymentMethods.annual
            ? 1
            : method === PaymentMethods.monthly
            ? 12
            : 2));

      if (finalBalance == 0) {
        flag = true;
      }

      if (finalBalance < valueInstallment) {
        valueInstallment = finalBalance + interestValue;
      }

      finalBalance = loanPartial - (valueInstallment - interestValue);
    }
    return array;
  }

  async amortizationTableGenerateCaseTwo(
    scheduledPayment: number,
    dateCredit: Date,
    installments: number,
    method: PaymentMethods,
    interest: number,
  ): Promise<CreateInstallment[]> {
    const methodPayment =
      this.interestCalculate(
        interest,
        (method === PaymentMethods.monthly ? 12 : 1) * 100,
      ) / (method === PaymentMethods.biannual ? 2 : 1);

    const valueCredit = this.pmtTwo(
      scheduledPayment,
      installments,
      methodPayment,
    );
    return this.amortizationTableGenerate(
      dateCredit,
      dateCredit,
      valueCredit,
      method,
      interest,
      installments,
    );
  }

  async amortizationTableChange(
    array: CreateInstallment[],
    interest: number,
    method: PaymentMethods,
  ): Promise<CreateInstallment[]> {
    const arrayFinal: CreateInstallment[] = [];
    let loanInitial = array[0].initialBalance;
    let interestValue = 0;
    let finalBalance = 0;
    let totalPayment = 0;
    let scheduledPayment = array[0].scheduledPayment;
    for (let i = 0; i < array.length; i++) {
      interestValue =
        loanInitial *
        ((interest * 12) /
          100 /
          (method === PaymentMethods.annual
            ? 1
            : method === PaymentMethods.monthly
            ? 12
            : 2));

      totalPayment = scheduledPayment + array[i].extraPayment;
      finalBalance = loanInitial - (totalPayment - interestValue);

      arrayFinal.push({
        installmentNumber: i + 1,
        paymentDate: array[i].paymentDate,
        initialBalance: Math.round(loanInitial),
        scheduledPayment: Math.round(scheduledPayment),
        extraPayment: Math.round(array[i].extraPayment),
        totalPayment: Math.round(totalPayment),
        capital: Math.round(totalPayment - interestValue),
        interest: Math.round(interestValue),
        finalBalance: Math.round(finalBalance),
      });

      loanInitial = finalBalance;
      if (finalBalance < scheduledPayment) {
        scheduledPayment =
          finalBalance +
          loanInitial *
            ((interest * 12) /
              100 /
              (method === PaymentMethods.annual
                ? 1
                : method === PaymentMethods.monthly
                ? 12
                : 2));
      }
      if (finalBalance === 0) {
        break;
      }
    }
    return arrayFinal;
  }

  async amortizationTableChangeUpdate(
    array: CreateInstallment[],
    interest: number,
    method: PaymentMethods,
  ): Promise<CreateInstallment[]> {
    console.log('Update table', array);
    const arrayFinal: CreateInstallment[] = [];
    let loanInitial = array[0].initialBalance;
    let interestValue = 0;
    let finalBalance = 0;
    let totalPayment = 0;
    let extraPayment = 0;
    let capital = 0;
    let scheduledPayment = array[0].scheduledPayment;
    for (let i = 0; ; i++) {
      interestValue =
        loanInitial *
        ((interest * 12) /
          100 /
          (method === PaymentMethods.annual
            ? 1
            : method === PaymentMethods.monthly
            ? 12
            : 2));

      if (i < array.length) {
        if (
          array[i].state === StateInstallment.PENDIENTE ||
          array[i].state === StateInstallment.APLAZADA
        ) {
          if (
            array[i].scheduledPayment === array[i].totalPayment ||
            array[i].scheduledPayment + array[i].extraPayment ===
              array[i].totalPayment
          ) {
            totalPayment = array[i].scheduledPayment + array[i].extraPayment;
            extraPayment = Math.round(array[i].extraPayment);
          } else {
            totalPayment = array[i].totalPayment;
            extraPayment = 0;
          }

          if (
            totalPayment === scheduledPayment ||
            interestValue < totalPayment
          ) {
            console.log(totalPayment, scheduledPayment);
            finalBalance = loanInitial - (totalPayment - interestValue);
            capital = totalPayment - interestValue;
          } else {
            const interest = interestValue + 0;
            if (interestValue >= totalPayment) {
              capital = 0;
              interestValue = totalPayment;
              finalBalance = loanInitial + (interest - totalPayment);
            }
          }

          arrayFinal.push({
            installmentNumber: i + 1,
            paymentDate: array[i].paymentDate,
            initialBalance: Math.round(loanInitial),
            scheduledPayment: Math.round(scheduledPayment),
            extraPayment: extraPayment,
            totalPayment: Math.round(totalPayment),
            capital: Math.round(capital),
            interest: Math.round(interestValue),
            finalBalance: Math.round(finalBalance),
            state: StateInstallment.PENDIENTE,
          });

          if (finalBalance < scheduledPayment) {
            scheduledPayment =
              finalBalance +
              loanInitial *
                ((interest * 12) /
                  100 /
                  (method === PaymentMethods.annual
                    ? 1
                    : method === PaymentMethods.monthly
                    ? 12
                    : 2));
          }
        } else {
          finalBalance = array[i].finalBalance;
          arrayFinal.push({
            installmentNumber: i + 1,
            paymentDate: array[i].paymentDate,
            initialBalance: Math.round(loanInitial),
            scheduledPayment: Math.round(array[i].scheduledPayment),
            extraPayment: extraPayment,
            totalPayment: Math.round(array[i].totalPayment),
            capital: Math.round(array[i].capital),
            interest: Math.round(array[i].interest),
            finalBalance: Math.round(array[i].finalBalance),
            state: array[i].state,
          });
        }
      } else {
        totalPayment = scheduledPayment;
        finalBalance = loanInitial - (totalPayment - interestValue);
        arrayFinal.push({
          installmentNumber: i + 1,
          paymentDate: addMonths(array[0].paymentDate, i),
          initialBalance: Math.round(loanInitial),
          scheduledPayment: Math.round(scheduledPayment),
          extraPayment: Math.round(0),
          totalPayment: Math.round(totalPayment),
          capital: Math.round(totalPayment - interestValue),
          interest: Math.round(interestValue),
          finalBalance: Math.round(finalBalance),
          state: StateInstallment.PENDIENTE,
        });
      }
      if (finalBalance < scheduledPayment) {
        scheduledPayment =
          finalBalance +
          finalBalance *
            ((interest * 12) /
              100 /
              (method === PaymentMethods.annual
                ? 1
                : method === PaymentMethods.monthly
                ? 12
                : 2));

        interestValue =
          finalBalance *
          ((interest * 12) /
            100 /
            (method === PaymentMethods.annual
              ? 1
              : method === PaymentMethods.monthly
              ? 12
              : 2));
        totalPayment = scheduledPayment;

        arrayFinal.push({
          installmentNumber: i + 2,
          paymentDate: addMonths(array[0].paymentDate, i + 2),
          initialBalance: Math.round(finalBalance),
          scheduledPayment: Math.round(scheduledPayment),
          extraPayment: Math.round(0),
          totalPayment: Math.round(totalPayment),
          capital: Math.round(totalPayment - interestValue),
          interest: Math.round(interestValue),
          finalBalance: Math.round(0),
          state: StateInstallment.PENDIENTE,
        });
        break;
      }

      loanInitial = finalBalance + 0;
      console.log('finalBalance', finalBalance);
    }
    return arrayFinal;
  }

  pmt(
    principal: number,
    numberOfPayments: number,
    monthlyInterestRate: number,
  ): number {
    const presentValueFactor = Math.pow(
      1 + monthlyInterestRate,
      numberOfPayments,
    );
    return (
      (principal * monthlyInterestRate * presentValueFactor) /
      (presentValueFactor - 1)
    );
  }

  pmtTwo(
    scheduledPayment: number,
    numberOfPayments: number,
    interestRate: number,
  ): number {
    const presentValueFactor = Math.pow(1 + interestRate, -numberOfPayments);
    console.log(presentValueFactor);
    return scheduledPayment * ((1 - presentValueFactor) / interestRate);
  }
}
