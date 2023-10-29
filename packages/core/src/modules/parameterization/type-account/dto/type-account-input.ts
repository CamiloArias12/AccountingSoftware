import { InputType, Field } from '@nestjs/graphql';
import { NatureEnum } from './enum-type';

@InputType()
export class TypeAccountInput{
    
    @Field()
    code: number;

    @Field()
    name: string;

    @Field()
    nature: NatureEnum;

}
