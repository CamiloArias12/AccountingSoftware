import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTypeCreditDto {
    @Field()
    id: number;

    @Field()
    nombre: string;

    @Field()
    cuentas: string;
}
