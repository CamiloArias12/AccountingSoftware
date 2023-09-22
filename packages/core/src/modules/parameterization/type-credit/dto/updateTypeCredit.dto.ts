import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTypeCreditDto {
    @Field()
    idTypeCredit: number;

    @Field({ nullable: true })
    nombre?: string;

    @Field(() => [Int], { nullable: true }) 
    subAccount?: number[];

    @Field(() => [Int], { nullable: true }) 
    account?: number[];

    @Field(() => [Int], { nullable: true }) 
    auxiliary?: number[];
}
