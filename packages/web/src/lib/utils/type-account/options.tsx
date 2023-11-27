export enum TypeAccountEnum {
  CLASS = 'Clase',
  GROUP = 'Grupo',
  ACCOUNT = 'Cuenta',
  SUBACCOUNT = 'Subcuenta',
  AUXILIARY = 'Auxiliar',
}

export const optionsAccounts = [
  {
    id: 0,
    name: TypeAccountEnum.CLASS,
  },
  {
    id: 1,
    name: TypeAccountEnum.GROUP,
  },
  {
    id: 2,
    name: TypeAccountEnum.ACCOUNT,
  },
  {
    id: 3,
    name: TypeAccountEnum.SUBACCOUNT,
  },
  {
    id: 4,
    name: TypeAccountEnum.AUXILIARY,
  },
];

export enum EnumNature {
  DEBT = 'Debito',
  CREDIT = 'Crédito',
}
export const optionsNature = [
  {
    id: 0,
    name: EnumNature.DEBT,
  },
  {
    id: 1,
    name: EnumNature.CREDIT,
  },
];
