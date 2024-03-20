import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useMemo, useReducer, useRef, useState } from 'react'
import { AmortizationTable } from '@/lib/utils/credit/types'
import { NumericFormat } from 'react-number-format'
import { format } from 'date-fns'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import TableInfo from '../../table/TableGeneral'

function UpdateTableAmortization({
  data,
  handleAmortizationTable,
  setData
}: {
  data: AmortizationTable[]
  setData: any
  handleAmortizationTable: any
}) {
  const handleLoanExtra = (index: number, value: number) => {
    const dataA = [...data]
    console.log(data[index])
    dataA[index].extraPayment = Number(value)
    setData(dataA)
  }

  const handleLoanTotal = (index: number, value: number) => {
    const dataA = [...data]
    console.log(data[index])
    dataA[index].totalPayment = Number(value)
    setData(dataA)
  }

  console.log('Render ', data)

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
        cell: (row: any) => (
          <>
            <NumericFormat
              className="text-center"
              value={row.getValue() === '' ? 0 : row.getValue()}
              thousandSeparator=","
              defaultValue={0}
              prefix="$ "
              readOnly={
                row.row._valuesCache.state === 'Pendiente' ? false : true
              }
              renderText={value => <b> $ {value}</b>}
              onValueChange={values => {
                if (values.value === '') {
                  handleLoanExtra(row.row.id, 0)
                } else {
                  handleLoanExtra(row.row.id, values.floatValue)
                }
              }}
            />
          </>
        ),
        header: () => <span>Pago extra</span>
      },

      {
        accessorKey: 'totalPayment',
        cell: (row: any) => (
          <>
            <NumericFormat
              className="text-center"
              value={row.getValue() === '' ? 0 : row.getValue()}
              thousandSeparator=","
              defaultValue={0}
              readOnly={
                row.row._valuesCache.state === 'Pendiente'
                  ? false
                  : row.row._valuesCache.state === 'Aplazada'
                    ? false
                    : true
              }
              prefix="$ "
              renderText={value => <b> $ {value}</b>}
              onValueChange={values => {
                if (values.value === '') {
                  handleLoanTotal(row.row.id, 0)
                } else {
                  handleLoanTotal(row.row.id, values.floatValue)
                }
              }}
            />
          </>
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
    <div className="flex flex-grow flex-col overflow-scroll">
      <button
        className="  text-input flex flex-row rounded-sm bg-[#F2F5FA] p-2 "
        onClick={handleAmortizationTable}
      >
        <img src="/refresh.svg" height={20} width={20} />
        <label className="font-sans px-4 text-sm">Actualizar</label>
      </button>
      <TableInfo
        table={table}
        className="max-w-full overflow-auto min-h-80 py-2 text-sm table-amortization"
        rowId={rowId}
        setRow={setRowId}
        key={1}
      />
    </div>
  )
}

export default UpdateTableAmortization
