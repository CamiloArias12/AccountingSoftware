import { InputType, Field } from '@nestjs/graphql';
import { NatureEnum } from './enum-type';

@InputType()
export class CreateTypeAccount{
    
    @Field()
    code: number;

    @Field()
    name: string;

    @Field()
    nature: NatureEnum;

}
