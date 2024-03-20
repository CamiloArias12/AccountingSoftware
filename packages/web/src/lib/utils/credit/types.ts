export type AmortizationTable = {
  installmentNumber: number
  paymentDate: Date
  initialBalance: number
  scheduledPayment: number
  extraPayment: number
  totalPayment: number
  capital: number
  interest: number
  finalBalance: number
  state?: boolean
}

export type Credit = {
  id?: number
  name: string
  lastName: string
  creditValue: number
  interest: number
  discountDate: Date
  state: string
  nameCredit: string
  valuePrevius: number
}

export type RefinanceCredit = {
  nameAffiliate: string

  identification: number

  previewBalance: number

  typeCredit: string

  interest: number

  idTypeCredit: number
}

export type InstallmentPayment = {
  installmentNumber: number
  isSelected: boolean
  credit: number
  paymentDate: Date
  scheduledPayment: number
  interest: number
  finalBalance: number
  identification: number
  name: string
  lastName: string
  typeCredit: string
  extraPayment: number
  totalPayment: number
  capital: number
  interestPayment: number
}

export type CreditStatistics = {
  total: number

  total_value: number

  total_approved: number

  total_progress: number

  total_refinanced: number

  total_finalized: number
  total_dibursed: number
}
