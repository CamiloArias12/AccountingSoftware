import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditMovement } from './credit-movement.entity';
import { CreditDisbursementInput } from './dto/types';
import { CreditService } from 'src/modules/wallet/credit/credit.service';
import { CREDIT_MOVEMENT } from '../dto/enum-type';
import { Movement } from '../movement/movement.entity';
import { AccountMovement } from '../account-movement/account-movement.entity';
import {
  NatureEnum,
  TypeAccountEnum,
} from 'src/modules/parameterization/type-account/dto/enum-type';
import { CompanyService } from 'src/modules/parameterization/thirds/company/company.service';
import { StateCredit } from 'src/modules/wallet/credit/dto/enum-types';
import { UserService } from 'src/modules/parameterization/thirds/user/user.service';
import { TypeAccountCreditEnum } from 'src/modules/parameterization/type-credit/dto/enum-types';
import { AuxiliaryService } from 'src/modules/parameterization/type-account/auxiliary/auxiliary.service';
@Injectable()
export class CreditMovementService {
  constructor(
    @InjectRepository(CreditMovement)
    private readonly movementCreditRepository: Repository<CreditMovement>,
    @Inject(forwardRef(() => CreditService))
    private readonly creditService: CreditService,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
    private readonly accountService: AuxiliaryService,
  ) {}
  async find(): Promise<CreditMovement[]> {
    return await this.movementCreditRepository.find({
      relations: {
        movement: true,
      },
    });
  }

  async createCreditMovement(creditMovement: CreditMovement) {
    return await this.movementCreditRepository.save(creditMovement);
  }
  async createDisbursementPayment(data: CreditDisbursementInput) {
    const movement: Movement = new Movement();
    movement.date = data.date;
    movement.concept = data.concept;
    for (const credit of data.credits) {
      const accountsMovements: AccountMovement[] = [];
      const creditQuery = await this.creditService.findOne({
        where: { id: credit.id },
      });
      const creditMovement: CreditMovement = new CreditMovement();
      for (const account of creditQuery.typeCredit.auxiliaries) {
        if (
          account.nature === NatureEnum.CREDIT &&
          account.typeAccount === TypeAccountCreditEnum.CAPITAL
        ) {
          const accuntMovement: AccountMovement = new AccountMovement();
          accuntMovement.nature = NatureEnum.DEBIT;
          accuntMovement.auxiliary = account.account;
          accuntMovement.value = credit.creditValue;
          accuntMovement.user = creditQuery.affiliate.user;
          accountsMovements.push(accuntMovement);
        }
      }

      const accuntMovement: AccountMovement = new AccountMovement();
      accuntMovement.value = credit.creditValue;
      accuntMovement.nature = data.nature;
      accuntMovement.auxiliary = await this.accountService.findOne(
        data.idAccount,
      );
      if (data.company) {
        accuntMovement.company = await this.companyService.findOne(
          data.company,
        );
      } else {
        accuntMovement.user = await this.userService.findOne(data.user);
      }
      accountsMovements.push(accuntMovement);
      creditMovement.movement = movement;
      creditMovement.credit = creditQuery;
      creditMovement.account_movement = accountsMovements;

      await this.movementCreditRepository.save(creditMovement);
      await this.creditService.updateState(credit.id, StateCredit.DESEMBOLSADO);
    }
  }
}
