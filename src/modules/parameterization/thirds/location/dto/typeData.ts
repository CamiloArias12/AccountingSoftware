import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Location{

    @Field()
    id: number

    @Field()
    name: string

    @Field()
    iso2:string

}

