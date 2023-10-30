export enum MenuSidebar {
  main = 'main',
  parametrization = 'parametrization',
  wallet = 'wallet',
  accounting = 'accounting',
  treasury = 'treasury',
}

export const SideBarModules = [
  {
    name: 'Inicio',
    href: '/dashboard',
    menu: MenuSidebar.main,
  },

  {
    name: 'Parametrizacion',
    href: '/dashboard/parametrization',
    menu: MenuSidebar.parametrization,
  },
  {
    name: 'Cartera ,aportes',
    href: 'wallet',
    menu: MenuSidebar.wallet,
  },
  {
    name: 'Contabilidad',
    href: 'accounting',
    menu: MenuSidebar.accounting,
  },
  {
    name: 'Tesoreria',
    href: 'treasury',
    menu: MenuSidebar.treasury,
  },
];
