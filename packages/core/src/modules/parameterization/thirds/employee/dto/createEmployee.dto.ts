import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployee{

    @Field()
    username: string;

    @Field()
    password: string;

}
