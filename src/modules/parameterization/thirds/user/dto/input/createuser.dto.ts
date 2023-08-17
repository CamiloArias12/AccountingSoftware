import { InputType } from "@nestjs/graphql";
import { CivilStatus, Gender, HousingType, Studies, TypeIdentification } from "../enum-type";

@InputType()
export class InputUser{

   typeidentification: TypeIdentification;

   expeditionDate:Date

   expeditionCity:string

   countryCard: string;

   municipalityCard: String

   cityCard: String

   name:string

   lastName:string

   gender: Gender;

   statusCivil: CivilStatus;

   addressResidence: string

   municipality: String

   city: String

   phone: number

   landLine: number

   email: string

   housingType: HousingType;

   studies: Studies;

   profession: string

   foreignOperations: boolean

   publicResources: boolean

   publicRecognition: boolean

   publicPower: boolean

}
