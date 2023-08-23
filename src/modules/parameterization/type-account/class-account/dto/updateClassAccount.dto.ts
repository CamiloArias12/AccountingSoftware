import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateClassAccountDto {
    
    @Field({ nullable: true })
    code?: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    nature?: string;
}