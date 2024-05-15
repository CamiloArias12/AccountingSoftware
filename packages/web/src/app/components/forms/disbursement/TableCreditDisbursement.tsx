import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import { Credit } from '@/lib/utils/credit/types'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import TableInfo from '../../table/TableGeneral'

function TableCreditsDisbursement({
  disbursements,
  rowSelection,
  setRowSelection
}: {
  disbursements: Credit[]
  rowSelection: any
  setRowSelection: any
}) {
  const [data, setData] = useState<Credit[]>(disbursements)
  const [concept, setConcept] = useState('')

  const columns = useMemo<ColumnDef<Credit>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        header: () => <span>Crédito</span>,
        size: 50
      },
      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado'
      },
      {
        accessorKey: 'creditValue',
        cell: info => info.getValue(),
        header: () => <span>Valor</span>,
        size: 50
      },
      {
        accessorKey: 'interest',
        cell: info => info.getValue(),
        header: () => <span>Interés</span>,
        size: 50
      },
      {
        accessorKey: 'discountDate',
        cell: info => info.getValue(),
        header: () => <span>Fecha de descuento</span>
      }
    ],
    []
  )

  const [rowId, setRowId] = useState<number>(0)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },

    state: {
      sorting,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true
  })

  return (
    <div className="flex  flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">
      <div className="mx-4 my-2 flex-grow text-sm">
        <TableInfo
          table={table}
          className="account-table"
          rowId={rowId}
          setRow={setRowId}
          key={1}
        />
      </div>
    </div>
  )
}

export default TableCreditsDisbursement
