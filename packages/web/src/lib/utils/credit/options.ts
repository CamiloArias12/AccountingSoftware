export const optionsCredit = [
  {
    id: 0,
    name: 'Valor - No coutas'
  },
  {
    id: 1,
    name: 'Valor couta -No coutas'
  },
  {
    id: 2,
    name: 'Valor - Valor couta'
  }
]
export enum PaymentMethods {
  monthly = 'Mensual',
  biannual = 'Semestral',
  annual = 'Anual',
  singlePayment = 'Pago único'
}

export const optionsMethod = [
  {
    id: 0,
    name: PaymentMethods.monthly
  },
  {
    id: 1,
    name: PaymentMethods.biannual
  },
  {
    id: 2,
    name: PaymentMethods.annual
  },
  {
    id: 2,
    name: PaymentMethods.singlePayment
  }
]
