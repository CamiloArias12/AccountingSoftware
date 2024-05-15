import { TypeIdentification } from '../../user/dto/enum-type';
import { Regime, TypePerson } from './enum-type';

export interface ICompany {
  typeIdentification: string;

  identification: number;

  digitVerification: number;

  regime: Regime;

  typePerson: TypePerson;

  name: string;

  legalRepresentativeTypeIdentification: TypeIdentification;

  legalRepresentativeName: string;

  legalRepresentativeDocument: number;

  natureCompany: string;
}
