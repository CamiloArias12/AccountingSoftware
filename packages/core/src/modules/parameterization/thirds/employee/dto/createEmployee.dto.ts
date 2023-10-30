import { InputType, Field } from '@nestjs/graphql';
import { IEmployee } from './employee.interface';

@InputType()
export class InputEmployeeCreate implements IEmployee{

    @Field()
    username: string;

    @Field()
    password: string;

}
