import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useMemo, useRef, useState } from 'react'
import { AmortizationTable } from '@/lib/utils/credit/types'
import { format } from 'date-fns'
import TableInfo from '../../table/TableGeneral'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
function ViewTableAmortization({ data }: { data: AmortizationTable[] }) {
  const columns = useMemo<ColumnDef<AmortizationTable>[]>(
    () => [
      {
        accessorKey: 'installmentNumber',
        size: 50,
        cell: info => info.getValue(),
        header: () => <span>No.</span>
      },

      {
        accessorKey: 'paymentDate',
        size: 200,
        enableResizing: true,
        cell: (row: any) => (
          <>{format(new Date(row.getValue()), 'dd-MM-yyyy')}</>
        ),
        header: () => <span>Fecha de pago</span>
      },
      {
        accessorKey: 'initialBalance',
        cell: (info: any) => (
          <label>$ {info.getValue().toLocaleString()}</label>
        ),
        header: () => 'Balance inicial'
      },
      {
        accessorKey: 'scheduledPayment',
        cell: (info: any) => (
          <label>$ {info.getValue().toLocaleString()}</label>
        ),
        header: () => <span>Pago programado</span>
      },
      {
        accessorKey: 'extraPayment',
        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => <span>Pago extra</span>
      },

      {
        accessorKey: 'totalPayment',
        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,

        header: () => <span>Pago total</span>
      },
      {
        accessorKey: 'capital',

        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => <span>Capital</span>
      },
      {
        accessorKey: 'interest',

        cell: (info: any) => (
          <label>$ {info.getValue().toLocaleString()}</label>
        ),
        header: () => <span>Interes</span>
      },
      {
        accessorKey: 'finalBalance',

        cell: (info: any) => (
          <label>$ {info.getValue().toLocaleString()}</label>
        ),
        header: () => <span>Balance final</span>
      },

      {
        accessorKey: 'state',
        cell: (row: any) => (
          <div className="py-1">
            <label
              className={` py-1 px-4 rounded-[30px] ${
                row.getValue() === 'Pagada'
                  ? 'bg-[#BAF7D0] text-sm  text-[#306E47]'
                  : row.getValue() === 'Pago anticipado'
                    ? 'bg-[#BAF7D0] text-sm  text-[#306E47]'
                    : row.getValue() === 'Aplazada'
                      ? 'bg-[#AAA7D0] text-sm  text-[#306E47]'
                      : 'bg-[#FECACA] text-sm'
              }`}
            >
              {row.getValue()}
            </label>
          </div>
        ),
        header: () => <span>Estado</span>
      }
    ],
    []
  )

  const [rowId, setRowId] = useState<number>(0)
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      sorting
    },
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
  })

  return (
    <TableInfo
      table={table}
      className="max-w-full overflow-auto min-h-80 py-2 text-sm table-amortization"
      rowId={rowId}
      setRow={setRowId}
      key={1}
    />
  )
}

export default ViewTableAmortization
