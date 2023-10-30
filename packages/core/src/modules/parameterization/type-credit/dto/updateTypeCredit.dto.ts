import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTypeCreditInput {
  

    @Field({ nullable: true })
    name?: string;
   
    @Field({ nullable: true })
    interest?: number;
}
