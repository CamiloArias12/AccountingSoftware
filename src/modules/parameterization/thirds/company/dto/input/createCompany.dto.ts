import { InputType, Field } from '@nestjs/graphql';
import { Regime, TypePerson } from '../enum-type';


@InputType()
export class CreateCompanyDto {
    @Field()
    typeIdentification: string;

    @Field()
    numberIdentification: number;

    @Field()
    digitVerification: number;

    @Field(() => Regime)
    regime: Regime;

    @Field(() => TypePerson)
    typePerson: TypePerson;

    @Field()
    socialReason: string;

    @Field()
    legalRepresentativeTypeIdentificatio: string;

    @Field()
    legalRepresentativeName: string;

    @Field()
    legalRepresentativeDocument: string;

    @Field()
    natureCompany: string;
}