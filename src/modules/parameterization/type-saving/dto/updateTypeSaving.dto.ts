import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTypeSavingDto {
    @Field({ nullable: true })
    id?: number;

    @Field({ nullable: true })
    nombre?: string;

    @Field({ nullable: true })
    cuentas?: string;
}