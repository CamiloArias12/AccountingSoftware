import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSavingInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
