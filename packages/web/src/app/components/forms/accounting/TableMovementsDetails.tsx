import { Movement } from '@/lib/utils/accounting/types'
import Table from '../../table/Table'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'

function TableMovementsDetails({ movements }: { movements: Movement[] }) {
  const columns = useMemo<ColumnDef<Movement>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        header: () => <span>Id</span>
      },
      {
        accessorKey: 'date',
        cell: (row: any) => (
          <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
            {row.getValue().split('T', 1)}
          </label>
        ),

        header: () => 'Fecha'
      },
      {
        accessorKey: 'concept',
        cell: info => info.getValue(),
        header: () => <span>Concepto</span>
      },
      {
        accessorKey: 'state',
        cell: (row: any) => (
          <label
            className={` py-1 px-4 font-medium rounded-[30px] ${
              row.getValue()
                ? 'bg-[#BAF7D0] text-sm  text-[#306E47]'
                : 'bg-[#FECACA] text-sm'
            }`}
          >
            {row.getValue() ? 'Activo' : 'Inactivo'}
          </label>
        ),

        header: 'Estado'
      },
      {
        accessorKey: 'accounting',
        cell: info => info.getValue(),
        header: () => <span>Contabilización</span>
      }
    ],
    []
  )

  return (
    <>
      <Table columns={columns} data={movements} />
    </>
  )
}

export default TableMovementsDetails
