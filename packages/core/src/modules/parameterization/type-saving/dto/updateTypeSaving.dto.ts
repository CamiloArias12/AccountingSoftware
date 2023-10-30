import { InputType, Field} from '@nestjs/graphql';

@InputType()
export class UpdateTypeSavingInput {
    @Field()
    name: string;
   
}
