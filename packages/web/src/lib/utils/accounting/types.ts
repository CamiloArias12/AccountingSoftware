export type Movement = {
  id: string
  value: number
  date: Date
  concept: string
  accounting: string
  state: boolean
}

export type MovementAccount = {
  credit: number

  debit: string

  identification: number

  identificationThird: number

  nameThird: string

  code: number

  nameAccount: string
}
