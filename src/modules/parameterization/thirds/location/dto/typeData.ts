import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Country {

    @Field()
    geonameId: number

    @Field()
    countryName: string

    @Field()
    countryCode:string

}


export class Countries{
   geonames:[Country]
}
