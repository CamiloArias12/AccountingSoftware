export type TypeAccounnt = {
  code: number
  name: string
  nature?: string
  state?: boolean
}

export type GeneralTypeAccount = {
  typeAccount: TypeAccounnt
  type: string
  accounts: GeneralTypeAccount[]
}

export type TypeCreditSavingAcounts = {
  account: any
  nature: any
}
export type ClassAccountStatistics = {
  code: number
  name: string
  credit_balance: number
  debit_balance: number
}
