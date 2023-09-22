import { CivilStatus, Gender, HousingType, Studies, TypeIdentification } from "./enumThirds";

export type GeneralInformationData = {
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
export type TypeAccountFormData = {
    code: number | null;
    name: string;
    nature: string;
    account: any; 
    auxiliary: any;
    group: any; 
    classAccount: any; 
    subAccount: any;
};

export type TypeCreditFormData = {
    idTypeCredit: number | null;
    nombre: string;
};

export type TypeSavingFormData = {
    idTypeSaving: number | null;
    nombre: string;
};


