export enum TypeAccountEnum {
  CLASS = 'Clase',
  GROUP = 'Grupo',
  ACCOUNT = 'Cuenta',
  SUBACCOUNT = 'Subcuenta',
  AUXILIARY = 'Auxiliar'
}

export const optionsAccounts = [
  {
    id: 0,
    name: TypeAccountEnum.CLASS
  },
  {
    id: 1,
    name: TypeAccountEnum.GROUP
  },
  {
    id: 2,
    name: TypeAccountEnum.ACCOUNT
  },
  {
    id: 3,
    name: TypeAccountEnum.SUBACCOUNT
  },
  {
    id: 4,
    name: TypeAccountEnum.AUXILIARY
  }
]

export enum EnumNature {
  DEBT = 'Debito',
  CREDIT = 'Crédito'
}
export const optionsNature = [
  {
    id: 0,
    name: EnumNature.DEBT
  },
  {
    id: 1,
    name: EnumNature.CREDIT
  }
]

export const classColors = [
  'border-[#3498db]', // Clase 1: Activos
  'border-[#e74c3c]', // Clase 2: Pasivos
  'border-[#2ecc71]', // Clase 3: Patrimonio
  'border-[#f39c12]', // Clase 4: Ingresos
  'border-[#c0392b]', // Clase 5: Costos y Gastos
  'border-[#9b59b6]', // Clase 6: Cuentas de Orden
  'border-[#34495e]', // Clase 7: Gastos y Costos no Operacionales
  'border-[#e67e22]', // Clase 8: Resultados no Operacionales
  'border-[#95a5a6]' // Clase 9: Ajustes de Valor
]
