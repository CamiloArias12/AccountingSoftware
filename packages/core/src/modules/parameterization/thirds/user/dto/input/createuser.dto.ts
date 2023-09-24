import { Field, InputType } from "@nestjs/graphql";
import { CivilStatus, Gender, HousingType, Studies, TypeIdentification } from "../enum-type";
import { InputAffiliateCreate } from "../../../affiliate/dto/InputAffiliate";





@InputType()
export class UserInput{

   @Field() 
   typeidentification: TypeIdentification;

   @Field()
   identification:number

   @Field()
   expeditionDate:Date

   @Field()
   expeditionCity:string

   @Field()
   countryCard: string;

   @Field()
   municipalityCard: String

   @Field()
   cityCard: String

   @Field()
   name:string

   @Field()
   lastName:string

   @Field()
   gender: Gender;

   @Field()
   statusCivil: CivilStatus;

   @Field()
   addressResidence: string

   @Field()
   municipality: String

   @Field()
   city: String

   @Field()
   phone: number

   @Field()
   landLine: number

   @Field()
   email: string

   @Field()
   housingType: HousingType;

   @Field()
   studies: Studies;

   @Field()
   profession: string

   @Field()
   foreignOperations: boolean

   @Field()
   publicResources: boolean

   @Field()
   publicRecognition: boolean

   @Field()
   publicPower: boolean

}

