const route: string = '/dashboard/accounting/';

export enum LogoTreasury {
  payments = '/payment.svg',
  interest = '/interest.svg',
}
export const AccountingSideBar = [
  {
    name: 'Moviminetos credito',
    href: `${route}movements`,
    icon: LogoTreasury.payments,
  },
  {
    name: 'jkasdjf',
    href: `${route}interest`,
    icon: LogoTreasury.interest,
  },
];
