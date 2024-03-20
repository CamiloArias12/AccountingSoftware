export type Saving = {
  id?: number
  identification: number
  name: string
  lastName: string
  qoutaValue: number
  satartDate: Date
  nameSaving: string
}

export type DeferredSaving = {
  name: string
  lastName: string
  saving: number
  qoutaValue: number
  year: number
  month: number
}
