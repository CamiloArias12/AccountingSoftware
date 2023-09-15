import { Regime, TypePerson } from "./dto/enum-type";
export declare class Company {
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
