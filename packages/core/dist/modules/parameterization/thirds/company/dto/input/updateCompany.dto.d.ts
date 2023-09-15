import { Regime, TypePerson } from '../enum-type';
export declare class UpdateCompanyDto {
    typeIdentification?: string;
    numberIdentification?: number;
    digitVerification?: number;
    regime?: Regime;
    typePerson?: TypePerson;
    socialReason?: string;
    legalRepresentativeTypeIdentificatio?: string;
    legalRepresentativeName?: string;
    legalRepresentativeDocument?: string;
    natureCompany?: string;
}
