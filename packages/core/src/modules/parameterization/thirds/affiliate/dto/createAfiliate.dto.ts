import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAfiliateDto {
    @Field()
    company: string;

    @Field()
    addreesCompany: string;

    @Field()
    emailJob: string;

    @Field()
    salary: number;

    @Field()
    bank: string;

    @Field()
    jobTitle: string;

    @Field()
    phone: number;

    @Field()
    incomeCompany: number;

    @Field()
    typeAccount: string;

    @Field()
    numberAccount: number;
}
