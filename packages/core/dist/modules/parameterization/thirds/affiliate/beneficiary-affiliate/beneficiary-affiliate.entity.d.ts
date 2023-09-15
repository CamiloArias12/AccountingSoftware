import { Beneficiary } from "../beneficiary/beneficiary.entity";
import { Affiliate } from "../affiliate.entity";
export declare class BeneficiaryAffiliate {
    idAffiliate: number;
    idBeneficiary: number;
    percentage: number;
    beneficiary: Beneficiary;
    affiliate: Affiliate;
}
