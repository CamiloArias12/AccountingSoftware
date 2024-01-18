import { InputType, Field } from '@nestjs/graphql';
import { IBeneficiary } from './beneficiary-interface';
import { BeneficiaryAffiliate } from '../../beneficiary-affiliate/beneficiary-affiliate.entity';

@InputType()
export class BeneficiaryInput implements IBeneficiary {
  @Field()
  name: string;

  @Field()
  idDocument: number;
}

@InputType()
export class BeneficiaryInputGeneral {
  @Field(() => BeneficiaryInput)
  beneficiary: BeneficiaryInput;

  @Field()
  percentage: number;
}
