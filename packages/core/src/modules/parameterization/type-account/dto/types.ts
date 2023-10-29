import { NatureEnum, TypeAccountEnum } from "./enum-type"
import { ITypeAccount } from "./type-account-interface"

export class AccountType implements ITypeAccount{
   code:number
   name:string
   nature:string
}


export type AccountTypeGeneral ={
   type:string
   typeAccount:AccountType
}
