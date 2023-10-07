import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTypeCreditDto {

    @Field()
    name: string;
   
    @Field()
    interest: number;

    @Field(() => [Int]) 
    auxiliary?: number[];
}


