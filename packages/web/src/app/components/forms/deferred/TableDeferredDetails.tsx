import { DeferredSaving } from '@/lib/utils/savings/types'
import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react'
import Modal from '../../modal/Modal'
import Table from '../../table/Table'
const columnsSaving = () =>
  useMemo<ColumnDef<DeferredSaving>[]>(
    () => [
      {
        accessorKey: 'saving',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue().split('T', 1)}
            </label>
          </div>
        ),

        header: () => 'Id'
      },

      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado'
      },

      {
        accessorKey: 'month',
        accessorFn: row => `${row.month} / ${row.year}`,
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue()}
            </label>
          </div>
        ),

        header: () => <span>Mes</span>
      }
    ],
    []
  )

function TableDeferredDetails({ deferreds }: { deferreds: any }) {
  console.log(deferreds)
  const [data, setData] = useState<any[]>(deferreds)
  const columnsCredit = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado'
      },
      {
        accessorKey: 'paymentDate',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue().split('T', 1)}
            </label>
          </div>
        ),

        header: () => <span>Fecha de pago</span>
      },
      {
        accessorKey: 'interest',
        cell: info => info.getValue(),
        header: () => <span>Interés</span>,
        size: 50
      },
      {
        accessorKey: 'credit',
        cell: info => info.getValue(),
        header: () => <span>Crédito</span>,
        size: 50
      },
      {
        accessorKey: 'installmentNumber',
        cell: info => info.getValue(),
        header: () => <span>Couta</span>,
        size: 50
      },
      {
        accessorKey: 'interestPayment',
        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => <span>Valor</span>,
        size: 50
      }
    ],
    []
  )

  const columnsSaving = useMemo<ColumnDef<DeferredSaving>[]>(
    () => [
      {
        accessorKey: 'saving',
        cell: info => info.getValue(),
        header: () => 'Id ahorro'
      },

      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado'
      },
      {
        accessorKey: 'qoutaValue',
        cell: (info: any) => <>$ {info.getValue()?.toLocaleString()}</>,
        header: () => <span>Valor couta</span>
      },

      {
        accessorKey: 'month',
        accessorFn: row => `${row.month} / ${row.year}`,
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue()}
            </label>
          </div>
        ),

        header: () => <span>Mes</span>
      }
    ],
    []
  )

  return (
    <Table
      data={deferreds}
      columns={deferreds[0]?.saving ? columnsSaving : columnsCredit}
    />
  )
}

export default TableDeferredDetails
