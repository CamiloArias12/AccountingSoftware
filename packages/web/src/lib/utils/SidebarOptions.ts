export enum MenuSidebar {
  main = 'main',
  parametrization = 'parametrization',
  wallet = 'wallet',
  accounting = 'accounting',
  treasury = 'treasury'
}

export const Modules = {
  '/dashboard': 'Inicio',
  '/thirds': 'Terceros',
  '/saving': 'Ahorros',
  '/credit': 'Créditos',
  '/typeaccount': 'Plan de cuentas',
  '/typesaving': 'Tipos de ahorro',
  '/typecredit': 'Tipos de crédito',
  '/movements': 'Movimientos',
  '/deferred': 'Diferidos',
  '/cash': 'Recibos de caja',
  '/roles': 'Roles',
  '/notes': 'Notas contables',
  '/bookauxiliary': 'Libro auxiliar',
  '/disbursementvoucher': 'Comprobantes de egreso'
}

export const ModulesMobile = {
  '/dashboard': 'Inicio',
  '/thirds': 'Terceros',
  '/thirds/create': 'Crear tercero',
  '/thirds/update': 'Editar tercero',
  '/saving': 'Ahorros',
  '/credit': 'Créditos',
  '/credit/create': 'Crear crédito',
  '/credit/update': 'Editar crédito',
  '/credit/refinance': 'Refinanciar crédito',
  '/typeaccount': 'Plan de cuentas',
  '/typesaving': 'Tipos de ahorro',
  '/typecredit': 'Tipos de crédito',
  '/movements': 'Movimientos',
  '/deferred': 'Diferidos',
  '/deferred/create': 'Crear diferido',
  '/cash': 'Recibos de caja',
  '/cash/create': 'Crear recibo de caja',
  '/roles': 'Roles',
  '/notes': 'Notas contables',
  '/notes/create': 'Crear nota',
  '/notes/update': 'Editar nota',
  '/bookauxiliary': 'Libro auxiliar',
  '/disbursementvoucher': 'Comprobantes de egreso',
  '/disbursementvoucher/create': 'Crear comprobante'
}
export const SideBarModules = [
  {
    name: 'Inicio',
    href: '/dashboard',
    menu: MenuSidebar.main
  },

  {
    name: 'Parametrización',
    href: '/dashboard/parametrization',
    menu: MenuSidebar.parametrization
  },
  {
    name: 'Cartera ,aportes',
    href: 'wallet',
    menu: MenuSidebar.wallet
  },
  {
    name: 'Contabilidad',
    href: 'accounting',
    menu: MenuSidebar.accounting
  },
  {
    name: 'Tesorería',
    href: 'treasury',
    menu: MenuSidebar.treasury
  }
]
