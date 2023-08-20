import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBeneficiaryDto {
    @Field()
    name: string;

    @Field()
    idDocument: number;

    @Field()
    percentage: number;
}