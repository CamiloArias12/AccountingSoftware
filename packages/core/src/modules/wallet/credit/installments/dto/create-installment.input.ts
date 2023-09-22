import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInstallmentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
