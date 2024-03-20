import {
  CivilStatus,
  Gender,
  HousingType,
  Studies,
  TypeIdentification,
} from './enum-type';

export interface IUser {
  typeIdentification: TypeIdentification;

  identification: number;

  name: string;

  lastName: string;

  expeditionDate: Date;

  expeditionCity: string;

  birthDate: Date;

  countryBirth: string;

  stateBirth: string;

  cityBirth: string;

  gender: Gender;

  statusCivil: CivilStatus;

  addressResidence: string;

  countryResidence: string;

  stateResidence: String;

  cityResidence: String;

  phone: string;

  landLine: string;

  email: string;

  housingType: HousingType;

  studies: Studies;

  profession: string;

  foreignOperations: boolean;

  publicResources: boolean;

  publicRecognition: boolean;

  publicPower: boolean;
}
