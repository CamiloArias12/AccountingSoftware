import { IAfiliate } from "./dto/afiliate.interface";
import { User } from "../user/user.entity";
import { BeneficiaryAffiliate } from "./beneficiary-affiliate/beneficiary-affiliate.entity";
export declare class Affiliate implements IAfiliate {
    idAffiliate: number;
    company: string;
    addreesCompany: string;
    emailJob: string;
    salary: number;
    bank: string;
    jobTitle: string;
    phone: number;
    incomeCompany: number;
    typeAccount: string;
    numberAccount: number;
    user: User;
    beneficiaries: BeneficiaryAffiliate[];
}
