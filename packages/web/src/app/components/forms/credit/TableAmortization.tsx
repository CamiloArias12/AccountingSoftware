import { Affiliate } from '@/lib/utils/thirds/types'
import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import { AmortizationTable } from '@/lib/utils/credit/types'
import { NumericFormat } from 'react-number-format'
import { format } from 'date-fns'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import TableInfo from '../../table/TableGeneral'

function TableAmortization({
  setSelected,
  data,
  setData,
  handleAmortizationTable,
  isChange
}: {
  data: AmortizationTable[]
  setData: any
  handleAmortizationTable: any
  setSelected: any
  isChange: boolean
}) {
  const handleLoanExtra = (index: number, value: string) => {
    const dataA = [...data]
    dataA[index].extraPayment = Number(value)
    setData(dataA)
  }

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
        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => 'Balance inicial'
      },
      {
        accessorKey: 'scheduledPayment',

        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => <span>Pago programado</span>
      },
      {
        accessorKey: 'extraPayment',
        cell: (row: any) => (
          <>
            {isChange ? (
              <NumericFormat
                value={row.getValue() === '' ? 0 : row.getValue()}
                thousandSeparator=","
                defaultValue={0}
                prefix="$ "
                renderText={value => <b> $ {value}</b>}
                onValueChange={values => {
                  if (values.value === '') {
                    handleLoanExtra(row.row.id, '0')
                  } else {
                    handleLoanExtra(row.row.id, values.floatValue.toString())
                  }
                }}
              />
            ) : (
              <>{`$ ${row.getValue()}`}</>
            )}
          </>
        ),
        header: () => <span>Pago extra</span>
      },

      {
        accessorKey: 'totalPayment',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              $ {row.getValue().toLocaleString()}
            </label>
          </div>
        ),
        header: () => <span>Pago total</span>
      },
      {
        accessorKey: 'capital',

        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => <span>Capital</span>
      },
      {
        accessorKey: 'interest',

        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => <span>Interés</span>
      },
      {
        accessorKey: 'finalBalance',

        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => <span>Balance final</span>
      }
    ],
    []
  )

  const [sorting, setSorting] = useState<SortingState>([])
  const [rowId, setRowId] = useState<number>(0)
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
    <>
      {isChange && (
        <button
          className="  text-input flex flex-row rounded-sm bg-[#F2F5FA] p-2 "
          onClick={handleAmortizationTable}
        >
          <img src="/refresh.svg" height={20} width={20} />
          <label className="font-sans px-4 text-sm">Actualizar</label>
        </button>
      )}

      <TableInfo
        table={table}
        className="max-w-full overflow-auto min-h-80 py-2 text-sm table-amortization"
        rowId={rowId}
        setRow={setRowId}
        key={1}
      />
    </>
  )
}

export default TableAmortization
