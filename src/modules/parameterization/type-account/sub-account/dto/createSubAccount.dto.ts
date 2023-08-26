import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubAccountDto {
    
    @Field()
    code: number;

    @Field()
    name: string;

    @Field()
    nature: string;

    @Field()
    accountCode: number;
}