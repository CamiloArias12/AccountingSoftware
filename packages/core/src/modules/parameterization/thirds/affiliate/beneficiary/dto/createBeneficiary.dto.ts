import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BeneficiaryInput {
    @Field()
    name: string;

    @Field()
    idDocument: number;

}


@InputType()
export class BeneficiariesInput {
   
   @Field(() =>[BeneficiaryInput])
   beneficiaries:[BeneficiaryInput]

   @Field(() =>[Number])
   percentage:number[]


}


