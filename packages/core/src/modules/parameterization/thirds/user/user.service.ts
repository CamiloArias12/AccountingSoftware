import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource, Repository, TypeORMError } from 'typeorm';
import { UserInput } from './dto/input/createuser.dto';
import { AffiliateService } from '../affiliate/affiliate.service';
import { InputEmployeeCreate } from '../employee/dto/createEmployee.dto';
import { EmployeeService } from '../employee/employee.service';
import { ProviderService } from '../provider/provider.service';
import { Thirds } from '../dto/types';
import { BeneficiaryAffiliate } from '../affiliate/beneficiary-affiliate/beneficiary-affiliate.entity';
import { Affiliate } from '../affiliate/affiliate.entity';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';
import { BeneficiaryAffiliateService } from '../affiliate/beneficiary-affiliate/beneficiary-affiliate.service';
import { Beneficiary } from '../affiliate/beneficiary/beneficiary.entity';
import { BeneficiaryService } from '../affiliate/beneficiary/beneficiary.service';
import { InputAffiliateCreate } from '../affiliate/dto/InputAffiliate';
import { Employee } from '../employee/employee.entity';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly affiliateService: AffiliateService,
    private readonly employeeService: EmployeeService,
    private readonly providerService: ProviderService,
    private readonly beneficiaryAffiliateService: BeneficiaryAffiliateService,
    private readonly beneficiaryService: BeneficiaryService,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    dto: UserInput,
    affiliateInput?: InputAffiliateCreate,
    employee?: InputEmployeeCreate,
    provider?: boolean,
  ): Promise<ResponseGraphql> {
    if (affiliateInput || employee || provider) {
      if (!(await this.findOne(dto.identification))) {
        const user: User = this.userRepository.create(dto);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          const queryUser: User = await queryRunner.manager.save(User, user);
          if (affiliateInput) {
            await this.affiliateService.create(
              queryRunner,
              affiliateInput.inputAffiliate,
              queryUser,
              affiliateInput.beneficiaries,
            );
          }
          if (employee) {
            await this.employeeService.create(employee, queryUser, queryRunner);
          }

          if (provider) {
            await this.providerService.create(queryUser, queryRunner);
          }
          await queryRunner.commitTransaction();
          return {
            state: true,
            message: 'El usuario ha sido creado satisfactoriamente',
          };
        } catch (a) {
          console.log('Error transaccion', a);
          await queryRunner.rollbackTransaction();
        } finally {
          await queryRunner.release();
        }
      } else {
        return {
          state: false,
          message: 'El usuario ya existe',
        };
      }
    }
  }
  async update(
    identification: number,
    dto: UserInput,
    affiliateInput?: InputAffiliateCreate,
    employee?: InputEmployeeCreate,
    provider?: boolean,
  ): Promise<ResponseGraphql> {
    if (affiliateInput || employee || provider) {
      let user = await this.findOne(identification);
      console.log(user.identification);
      console.log(user);
      if (user) {
        if (affiliateInput && !user.affiliate) {
          const queryRunner = this.dataSource.createQueryRunner();
          await queryRunner.connect();
          await queryRunner.startTransaction();

          try {
            await this.affiliateService.create(
              queryRunner,
              affiliateInput.inputAffiliate,
              user,
              affiliateInput.beneficiaries,
            );

            await queryRunner.commitTransaction();
          } catch (a) {
            console.log('Error transaccion', a);
            await queryRunner.rollbackTransaction();
          } finally {
            await queryRunner.release();
          }
        }
        if (employee && !user.employee) {
          await this.employeeService.create(employee, user);
        }

        if (provider && !user.provider) {
          await this.providerService.create(user);
        }

        if (!provider && user.provider) {
          await this.providerService.delete(user.identification);
        }

        if (!employee && user.employee) {
          await this.employeeService.delete(user.identification);
        }
        if (!affiliateInput && user.affiliate) {
          console.log(employee);
          await this.affiliateService.delete(user.identification);
        }

        if (employee && user.employee) {
          const newEmployee = new Employee();
          newEmployee.username = employee.username;
          if (employee.password) {
            newEmployee.password = employee.password;
          }
          await this.employeeService.update(
            newEmployee,
            user.identification,
            employee.roles,
          );
        }
        if (affiliateInput && user.affiliate) {
          const queryRunner = this.dataSource.createQueryRunner();
          await queryRunner.connect();
          await queryRunner.startTransaction();

          try {
            const beneficiaries = user.affiliate.beneficiaries;
            console.log(beneficiaries);
            let beneficiariesEquals = beneficiaries.filter((beneficiary) =>
              affiliateInput.beneficiaries.some(
                (inputBeneficiary) =>
                  Number(inputBeneficiary.beneficiary.idDocument) ===
                  Number(beneficiary.beneficiary.idDocument),
              ),
            );

            let beneficiariesAdd = affiliateInput.beneficiaries.filter(
              (inputBeneficiary) =>
                !beneficiaries.some(
                  (beneficiary) =>
                    Number(inputBeneficiary.beneficiary.idDocument) ===
                    Number(beneficiary.beneficiary.idDocument),
                ),
            );

            let beneficiariesRemove = beneficiaries.filter(
              (beneficiary) =>
                !affiliateInput.beneficiaries.some(
                  (inputBeneficiary) =>
                    Number(beneficiary.beneficiary.idDocument) ===
                    Number(inputBeneficiary.beneficiary.idDocument),
                ),
            );
            let beneficiariesEqualsInput = affiliateInput.beneficiaries.filter(
              (beneficiary) =>
                beneficiaries.some(
                  (inputBeneficiary) =>
                    Number(inputBeneficiary.beneficiary.idDocument) ===
                    Number(beneficiary.beneficiary.idDocument),
                ),
            );

            console.log('Same', beneficiariesEquals);
            console.log('Delete', beneficiariesRemove);
            console.log('Add', beneficiariesAdd);

            for (const beneficiary of beneficiariesRemove) {
              await this.beneficiaryAffiliateService.delete(
                beneficiary.beneficiary.idDocument,
                beneficiary,
                queryRunner,
              );
            }

            for (let i = 0; i < beneficiariesEquals.length; i++) {
              beneficiaries[i].beneficiary = beneficiariesEqualsInput[i]
                .beneficiary as Beneficiary;
              beneficiaries[i].percentage =
                affiliateInput.beneficiaries[i].percentage;
              await this.beneficiaryAffiliateService.update(
                beneficiaries[i],
                queryRunner,
              );
              await this.beneficiaryService.update(
                beneficiaries[i].beneficiary,
                queryRunner,
              );
            }

            for (const beneficiary of beneficiariesAdd) {
              const beneficiaryAffiliate: BeneficiaryAffiliate =
                new BeneficiaryAffiliate();
              beneficiaryAffiliate.beneficiary =
                beneficiary.beneficiary as Beneficiary;
              await this.beneficiaryService.create(
                beneficiary.beneficiary,
                queryRunner,
              );
              beneficiaryAffiliate.percentage = beneficiary.percentage;
              beneficiaryAffiliate.idAffiliate = user.identification;
              await this.beneficiaryAffiliateService.create(
                beneficiaryAffiliate,
                queryRunner,
              );
            }
            user.affiliate = affiliateInput.inputAffiliate as Affiliate;

            await queryRunner.manager.update(
              Affiliate,
              { idAffiliate: user.identification },
              { ...user.affiliate, state: true },
            );
            console.log(user.affiliate);
            await queryRunner.commitTransaction();
          } catch (a) {
            console.log('Error transaccion', a);
            await queryRunner.rollbackTransaction();
          } finally {
            await queryRunner.release();
          }
        }

        try {
          await this.userRepository.update({ identification }, { ...dto });
        } catch (e) {
          console.log(e);
          if (e.errno) {
            return {
              state: false,
              message: 'El numero de identificacion ya existe',
            };
          }
        }

        return {
          state: true,
          message: 'Los datos han sido actuailizados ',
        };
      } else {
        return {
          state: false,
          message: 'El tercero no existe',
        };
      }
    }
  }

  async findOne(identification: number): Promise<User | null> {
    return await this.userRepository.findOne({
      relations: {
        affiliate: {
          beneficiaries: {
            beneficiary: true,
          },
        },
        provider: true,
        employee: { roles: true },
      },
      where: {
        identification: identification,
      },
    });
  }

  async count(): Promise<Number> {
    return await this.userRepository.count();
  }
  async findUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async changeStatus(identification: number, status: boolean): Promise<User> {
    console.log(
      await this.userRepository.update(
        { identification: identification },
        { status: status },
      ),
    );
    return await this.findOne(identification);
  }

  async delete(identification: number): Promise<Boolean> {
    try {
      await this.userRepository.delete(identification);
      return true;
    } catch (e) {
      return false;
    }
  }
}
