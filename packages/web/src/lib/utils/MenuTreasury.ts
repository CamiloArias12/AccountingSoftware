const route: string = '/dashboard/treasury/'

export enum LogoTreasury {
  payments = '/payment.svg',
  interest = '/interest.svg'
}
export const TreasurySideBar = [
  {
    name: 'Recibos de caja',
    href: `${route}cash`,
    permission: 'cash',
    icon: LogoTreasury.payments
  },
  {
    name: 'Comprobantes de egreso',
    href: `${route}disbursementvoucher`,
    permission: 'disbursementvoucher',
    icon: LogoTreasury.interest
  }
]
