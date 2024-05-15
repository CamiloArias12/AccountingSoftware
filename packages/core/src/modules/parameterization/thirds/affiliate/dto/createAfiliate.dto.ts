import { InputType, Field } from '@nestjs/graphql';
import { IAfiliate } from './afiliate.interface';
import { BeneficiaryInputGeneral } from '../beneficiary/dto/createBeneficiary.dto';

@InputType()
export class CreateAfiliateDto implements IAfiliate {
  @Field()
  company: string;

  @Field()
  addreesCompany: string;

  @Field()
  emailJob: string;

  @Field()
  salary: number;

  @Field()
  bank: string;

  @Field()
  jobTitle: string;

  @Field()
  phone: string;

  @Field()
  incomeCompany: Date;

  @Field()
  typeAccount: string;

  @Field()
  numberAccount: number;
}
