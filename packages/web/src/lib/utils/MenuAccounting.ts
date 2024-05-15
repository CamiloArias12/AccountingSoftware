const route: string = '/dashboard/accounting/'

export enum LogoTreasury {
  movements = '/movements.svg',
  book = '/book.svg',
  notes = '/notes.svg'
}
export const AccountingSideBar = [
  {
    name: 'Movimientos',
    href: `${route}movements`,
    permission: 'movement',
    icon: LogoTreasury.movements
  },
  {
    name: 'Notas contables',
    href: `${route}notes`,
    permission: 'note',
    create: true,
    icon: LogoTreasury.notes
  },
  {
    name: 'Libro auxiliar',
    permission: 'book_auxiliary',
    href: `${route}bookauxiliary`,
    icon: LogoTreasury.book
  }
]
