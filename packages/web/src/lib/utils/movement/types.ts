export enum EnumMovement {
  INTEREST = 'INTERES',
  SAVING = 'AHORROS',
  CREDIT = 'CREDITOS',
  OTHER = 'OTRO'
}
export enum EnumTypeNote {
  CASH = 'RECIBO DE CAJA',
  DISBURSEMENT = 'COMPROBANTE DE EGRESO',
  OTHER = 'OTRO'
}

export const DeferredOptions = [
  {
    id: 1,
    name: EnumMovement.INTEREST
  },
  {
    id: 2,
    name: EnumMovement.SAVING
  }
]

export const CashOptions = [
  {
    id: 1,
    name: EnumMovement.CREDIT
  },
  {
    id: 2,
    name: EnumMovement.SAVING
  },
  {
    id: 3,
    name: EnumTypeNote.OTHER
  }
]
export const DisbursementOptions = [
  {
    id: 1,
    name: EnumMovement.CREDIT
  },
  {
    id: 2,
    name: EnumTypeNote.OTHER
  }
]

export const NoteOptions = [
  {
    id: 1,
    name: EnumTypeNote.CASH
  },
  {
    id: 2,
    name: EnumTypeNote.DISBURSEMENT
  },
  {
    id: 3,
    name: EnumTypeNote.OTHER
  }
]
