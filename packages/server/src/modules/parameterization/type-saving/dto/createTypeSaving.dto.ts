import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTypeSavingDto {
    @Field()
    id: number;

    @Field()
    nombre: string;

    @Field()
    cuentas: string;
}