import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassAccountDto {
    
    @Field()
    code: number;

    @Field()
    name: string;

    @Field()
    nature: string;
}