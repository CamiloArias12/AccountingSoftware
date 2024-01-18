import { InputType, Field, Int, Float, ObjectType } from '@nestjs/graphql';
import { TypeSavingCreditAccount } from '../../type-account/dto/types';

@InputType()
export class CreateTypeCreditDto {

    @Field()
    name: string;
   
    @Field(() =>Float)
    interest: number;

   @Field(()=> [TypeSavingCreditAccount])
   accounts:TypeSavingCreditAccount[]

   @Field(()=> [TypeSavingCreditAccount])
   accountsInterest:TypeSavingCreditAccount[]

  }



