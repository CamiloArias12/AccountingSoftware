import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BeneficiaryInput {
    @Field()
    name: string;

    @Field()
    idDocument: number;

}


@InputType()
export class BeneficiaryInputGeneral {
   
   @Field(() =>BeneficiaryInput)
   beneficiary:BeneficiaryInput

   @Field()
   percentage:number


}



