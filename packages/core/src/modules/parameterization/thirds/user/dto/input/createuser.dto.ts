import { Field, InputType, Int } from '@nestjs/graphql';
import {
  CivilStatus,
  Gender,
  HousingType,
  Studies,
  TypeIdentification,
} from '../enum-type';
import { IUser } from '../user.interface';

@InputType()
export class UserInput implements IUser {
  @Field()
  typeIdentification: TypeIdentification;

  @Field()
  identification: number;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  expeditionDate: Date;

  @Field()
  expeditionCity: string;

  @Field()
  birthDate: Date;

  @Field()
  countryBirth: string;

  @Field()
  stateBirth: string;

  @Field()
  cityBirth: string;

  @Field()
  gender: Gender;

  @Field()
  statusCivil: CivilStatus;

  @Field()
  addressResidence: string;

  @Field()
  countryResidence: string;

  @Field()
  stateResidence: string;

  @Field()
  cityResidence: string;

  @Field()
  phone: string;

  @Field()
  landLine: string;

  @Field()
  email: string;

  @Field()
  housingType: HousingType;

  @Field()
  studies: Studies;

  @Field()
  profession: string;

  @Field()
  foreignOperations: boolean;

  @Field()
  publicResources: boolean;

  @Field()
  publicRecognition: boolean;

  @Field()
  publicPower: boolean;
}
