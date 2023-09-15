import { CivilStatus, Gender, HousingType, Studies, TypeIdentification } from "./enumThirds";

export type FormData = {
    typeIdentification: TypeIdentification | string;
    expeditionDate: Date | string;
    expeditionCity: string;
    countryCard: string;
    municipalityCard: string;
    cityCard: string;
    name: string;
    lastName: string;
    gender: Gender | string;
    statusCivil: CivilStatus | string;
    addressResidence: string;
    municipality: string;
    city: string;
    phone: number;
    landLine: number;
    email: string;
    housingType: HousingType | string;
    studies: Studies | string;
    profession: string;
    foreignOperations: boolean;
    publicResources: boolean;
    publicRecognition: boolean;
    publicPower: boolean;
};


export type country ={
   id:number
   name:string
   iso:string
}

export type Affiliate ={
      identification:number
      name:string
      lastName:string
      phone:number
      city:string
      salary:string
      status:boolean
}
