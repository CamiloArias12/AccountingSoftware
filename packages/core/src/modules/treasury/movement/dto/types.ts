import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class InputSearchMovement {
    @Field({ nullable: true })
    user: number

    @Field({ nullable: true })
    company: number

    @Field()
    startDate: Date

    @Field()
    endDate: Date

    @Field({ nullable: true })
    concept: string

    @Field({ nullable: true })
    idAccount: number

    @Field({ nullable: true })
    name: string
}
