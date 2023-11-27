const route: string = '/dashboard/wallet/'

export enum LogoModuleParametrization {
  savings = '/sav.svg',
  credits = '/credit.svg'
}
export const WalletSideBar = [
  {
    name: 'Ahorros',
    href: `${route}saving`,
    icon: LogoModuleParametrization.savings
  },
  {
    name: 'Créditos',
    href: `${route}credit`,
    icon: LogoModuleParametrization.credits
  }
]
