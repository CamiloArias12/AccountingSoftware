import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBeneficiaryDto {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    idDocument?: number;

    @Field({ nullable: true })
    percentage?: number;
}