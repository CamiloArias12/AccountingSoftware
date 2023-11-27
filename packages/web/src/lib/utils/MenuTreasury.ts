const route: string = '/dashboard/treasury/';

export enum LogoTreasury {
  payments = '/payment.svg',
  interest = '/interest.svg',
}
export const TreasurySideBar = [
  {
    name: 'Recibos de caja',
    href: `${route}cashreceipt`,
    icon: LogoTreasury.payments,
  },
  {
    name: 'Comprobantes de egreso',
    href: `${route}disbursementvoucher`,
    icon: LogoTreasury.interest,
  },
];
