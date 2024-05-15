import { Beneficiary } from '../../beneficiary/beneficiary.entity';

export interface IBeneficiaryAffiliate {
  beneficiary: Beneficiary;
  percentage: number;
}
