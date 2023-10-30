import { InputType, Field } from '@nestjs/graphql';
import { Regime, TypePerson } from '../enum-type';

@InputType()
export class UpdateCompanyDto {
    @Field({ nullable: true })
    typeIdentification?: string;

    @Field({ nullable: true })
    numberIdentification?: number;

    @Field({ nullable: true })
    digitVerification?: number;

    

        @Field({ nullable: true })
    socialReason?: string;

    @Field({ nullable: true })
    legalRepresentativeTypeIdentificatio?: string;

    @Field({ nullable: true })
    legalRepresentativeName?: string;

    @Field({ nullable: true })
    legalRepresentativeDocument?: string;

    @Field({ nullable: true })
    natureCompany?: string;
}
