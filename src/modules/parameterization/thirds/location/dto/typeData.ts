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

@ObjectType()
export class StateOrTown {

    @Field()
    geonameId: number

    @Field()
    toponymName:string

}

export class StatesOrTowns{
   geonames:[StateOrTown]
}


export class Countries{
   geonames:[Country]
}
