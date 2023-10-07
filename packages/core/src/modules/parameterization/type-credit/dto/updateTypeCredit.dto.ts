import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTypeCreditDto {
    @Field()
    id: number;

    @Field({ nullable: true })
    name?: string;
   
    @Field({ nullable: true })
    interest?: number;
    
    @Field(() => [Int], { nullable: true }) 
    auxiliary?: number[];
}
