const route: string = '/dashboard/parametrization/'

export enum LogoModuleParametrization {
  thirds = '/thirds.svg',
  typeAccounts = '/typeaccount.svg',
  typeSavings = '/savings.svg',
  typeCredits = '/typecredit.svg'
}

export const ParametrizationSideBar = [
  {
    name: 'Terceros',
    href: `${route}thirds/`,
    permission: 'third',
    icon: LogoModuleParametrization.thirds
  },
  {
    name: 'Plan de cuentas',
    href: `${route}typeaccount`,
    permission: 'type_account',
    icon: LogoModuleParametrization.typeAccounts
  },
  {
    name: 'Tipos de ahorro',
    href: `${route}typesaving`,
    permission: 'type_saving',
    icon: LogoModuleParametrization.typeSavings
  },
  {
    name: 'Tipos de crédito',
    href: `${route}typecredit`,
    permission: 'type_credit',
    icon: LogoModuleParametrization.typeCredits
  }
]
