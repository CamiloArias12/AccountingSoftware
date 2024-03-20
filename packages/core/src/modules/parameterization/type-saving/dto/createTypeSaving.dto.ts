import { InputType, Field, Int } from '@nestjs/graphql';
import { AuxiliarySaving } from './types';

@InputType()
export class CreateTypeSavingDto {
    @Field()
    name: string;

   @Field(() =>[AuxiliarySaving])
   accounts:AuxiliarySaving[]
}
