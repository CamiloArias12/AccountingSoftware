import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccountDto {
    
    @Field()
    code: number;

    @Field()
    name: string;

    @Field()
    nature: string;
}