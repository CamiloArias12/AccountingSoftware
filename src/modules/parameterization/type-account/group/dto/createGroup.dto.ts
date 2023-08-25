import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupDto {
    
    @Field()
    code: number;

    @Field()
    name: string;

    @Field()
    nature: string;
}