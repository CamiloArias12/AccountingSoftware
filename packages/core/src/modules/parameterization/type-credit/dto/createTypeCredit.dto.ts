import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateTypeCreditDto {

    @Field()
    name: string;
   
    @Field(() =>Float)
    interest: number;

    @Field(() => [Int]) 
    auxiliary?: number[];
}


