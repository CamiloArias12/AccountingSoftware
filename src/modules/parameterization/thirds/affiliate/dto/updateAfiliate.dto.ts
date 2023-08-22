import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAfiliateDto {
    @Field({ nullable: true })
    company?: string;

    @Field({ nullable: true })
    addreesCompany?: string;

    @Field({ nullable: true })
    emailJob?: string;

    @Field({ nullable: true })
    salary?: number;

    @Field({ nullable: true })
    bank?: string;

    @Field({ nullable: true })
    jobTitle?: string;

    @Field({ nullable: true })
    phone?: number;

    @Field({ nullable: true })
    incomeCompany?: number;

    @Field({ nullable: true })
    typeAccount?: string;

    @Field({ nullable: true })
    numberAccount?: number;
}
