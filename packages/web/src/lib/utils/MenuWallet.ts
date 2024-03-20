const route: string = '/dashboard/wallet/'

export enum LogoModuleWallet {
  savings = '/sav.svg',
  credits = '/credit.svg',
  deferred_interest = '/deferred-interest.svg'
}
export const WalletSideBar = [
  {
    name: 'Ahorros',
    href: `${route}saving`,
    permission: 'saving',
    icon: LogoModuleWallet.savings
  },
  {
    name: 'Créditos',
    href: `${route}credit`,
    permission: 'credit',
    icon: LogoModuleWallet.credits
  },
  {
    name: 'Diferidos',
    href: `${route}deferred`,
    permission: 'deferred',
    icon: LogoModuleWallet.deferred_interest
  }
]
