import { IBeneficiary } from "./dto/beneficiary-interface";
import { BeneficiaryAffiliate } from "../beneficiary-affiliate/beneficiary-affiliate.entity";
export declare class Beneficiary implements IBeneficiary {
    idDocument: number;
    name: string;
    beneficiaryAffiliate: BeneficiaryAffiliate[];
}
