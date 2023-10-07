import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTypeSavingDto {
    @Field()
    name: string;

   @Field(() => [Int], { nullable: true }) 
    auxiliary?: number[];
}
