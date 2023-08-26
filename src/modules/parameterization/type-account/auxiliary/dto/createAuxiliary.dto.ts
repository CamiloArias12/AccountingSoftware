import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuxiliaryDto {
    
    @Field()
    code: number;

    @Field()
    name: string;

    @Field()
    nature: string;

    @Field()
    subAccountCode: number;
}