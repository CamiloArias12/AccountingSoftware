import { Regime, TypePerson } from '../enum-type';
export declare class CreateCompanyDto {
    typeIdentification: string;
    numberIdentification: number;
    digitVerification: number;
    regime: Regime;
    typePerson: TypePerson;
    socialReason: string;
    legalRepresentativeTypeIdentificatio: string;
    legalRepresentativeName: string;
    legalRepresentativeDocument: string;
    natureCompany: string;
}
