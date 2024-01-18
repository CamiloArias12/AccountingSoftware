const route: string = '/dashboard/accounting/'

export enum LogoTreasury {
  payments = '/payment.svg',
  interest = '/interest.svg'
}
export const AccountingSideBar = [
  {
    name: 'Movimientos',
    href: `${route}movements`,
    permission: 'movement',
    icon: LogoTreasury.payments
  }
]
