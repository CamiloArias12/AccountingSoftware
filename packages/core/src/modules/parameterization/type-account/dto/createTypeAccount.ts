import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTypeAccountInput{
    
    @Field()
    code: number;

    @Field()
    name: string;

    @Field()
    nature: string;

}
