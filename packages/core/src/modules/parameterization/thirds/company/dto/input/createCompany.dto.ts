import { InputType, Field } from '@nestjs/graphql';
import { Regime, TypePerson } from '../enum-type';
import { ICompany } from '../company-interface';
import { TypeIdentification } from '../../../user/dto/enum-type';

@InputType()
export class CreateCompanyDto implements ICompany {
  @Field()
  typeIdentification: string;

  @Field()
  identification: number;

  @Field()
  digitVerification: number;

  @Field()
  regime: Regime;

  @Field()
  typePerson: TypePerson;

  @Field()
  name: string;

  @Field()
  legalRepresentativeTypeIdentification: TypeIdentification;

  @Field()
  legalRepresentativeName: string;

  @Field()
  legalRepresentativeDocument: number;

  @Field()
  natureCompany: string;
}
