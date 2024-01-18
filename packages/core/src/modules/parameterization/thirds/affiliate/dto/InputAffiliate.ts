import { Field, InputType } from '@nestjs/graphql';
import { CreateAfiliateDto } from './createAfiliate.dto';
import { BeneficiaryInputGeneral } from '../beneficiary/dto/createBeneficiary.dto';

@InputType()
export class InputAffiliateCreate {
  @Field()
  inputAffiliate: CreateAfiliateDto;

  @Field(() => [BeneficiaryInputGeneral])
  beneficiaries: [BeneficiaryInputGeneral];
}
