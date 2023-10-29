import { Regime, TypePerson } from "./enumThirds";

export type GeneralInformationData = {

   typeIdentification: string
   identification:any
   name:string
   lastName:string
   expeditionDate:Date
   expeditionCity:string
   birthDate:Date
   countryBirth: string;
   stateBirth: string
   cityBirth: string
   gender: string;
   statusCivil: string;
   addressResidence: string
   countryResidence: string;
   stateResidence: string
   cityResidence: string
   phone: string 
   landLine:string 
   email: string
   housingType: string;
   studies: string;
   profession: string
   foreignOperations: boolean
   publicResources: boolean
   publicRecognition: boolean
   publicPower: boolean

};


export interface IAfiliate{
   company:string

   addreesCompany:string

   emailJob:string

   salary:any

   bank:string

   jobTitle:string

   phone:any

   incomeCompany:Date

   typeAccount:string

   numberAccount:any

}
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
      salary:string
      status:boolean
      cityResidence:string
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

interface BeneficiaryInput {
    name: string;
    idDocument: any;

}


export interface Beneficiaries{

   beneficiary:BeneficiaryInput
   percentage:any

}
export type Company= {


    typeIdentification: string;

    numberIdentification: number;

    digitVerification: number;

    regime: string;

    typePerson: string;

    socialReason: string;

    legalRepresentativeTypeIdentificatio: string;

    legalRepresentativeName: string;

    legalRepresentativeDocument: string;

    natureCompany: string;
}
