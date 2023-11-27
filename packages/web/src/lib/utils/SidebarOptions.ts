export enum MenuSidebar {
  main = 'main',
  parametrization = 'parametrization',
  wallet = 'wallet',
  accounting = 'accounting',
  treasury = 'treasury',
}


export const  Modules ={
  "thirds":"Terceros", 
  "dashboard":"Inicio" ,
  "typeaccount":"Plan de cuentas",
  "typesaving":"Tipos de ahorro" ,
  "typecredit":"Tipos de crédito" ,
  "saving":"Ahorros",
  "credit":"Créditos",
  "movements":"Movimientos"
}
export const SideBarModules = [
  {
    name: 'Inicio',
    href: '/dashboard',
    menu: MenuSidebar.main,
  },

  {
    name: 'Parametrización',
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
    name: 'Tesorería',
    href: 'treasury',
    menu: MenuSidebar.treasury,
  },
];
