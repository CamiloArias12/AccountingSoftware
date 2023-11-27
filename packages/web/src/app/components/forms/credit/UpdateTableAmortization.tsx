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
import { gql, useMutation } from '@apollo/client'

const GENERATE_TABLE_AMORTIZATION_CHANGE = gql`
  mutation ($table: ChangeAmortization!) {
    amortizationTableChange(tableAmortization: $table) {
      installmentNumber
      paymentDate
      initialBalance
      scheduledPayment
      extraPayment
      totalPayment
      capital
      interest
      finalBalance
    }
  }
`

function UpdateTableAmortization({
  setSelected,
  data,
  setData
}: {
  data: AmortizationTable[]
  setData: any
  setSelected: any
}) {
  console.log(data)

  const [generateAmortizationChange] = useMutation(
    GENERATE_TABLE_AMORTIZATION_CHANGE
  )
  const handleLoanExtra = (index: number, value: string) => {
    const dataA = [...data]
    console.log(data[index])
    dataA[index].extraPayment = Number(value)
    setData(dataA)
  }

  const handleAmortizationTable = () => {
    const table = {
      tableAmortization: data
    }
    generateAmortizationChange({
      variables: {
        table: table
      }
    }).then((response: any) => {
      console.log(response)
      setData(response.data.amortizationTableChange)
    })
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
        cell: info => info.getValue(),
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
          <div className="py-1">
            <input
              className="bg-transparent text-center"
              value={row.getValue()}
              onChange={e => {
                handleLoanExtra(row.row.id, e.target.value)
              }}
            />
          </div>
        ),
        header: () => <span>Pago extra</span>
      },

      {
        accessorKey: 'totalPayment',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue().toLocaleString()}
            </label>
          </div>
        ),
        header: () => <span>Pago total</span>
      },
      {
        accessorKey: 'capital',

        cell: (info: any) => (
          <label>$ {info.getValue().toLocaleString()}</label>
        ),
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
                  : 'bg-[#FECACA] text-sm'
              }`}
            >
              {row.getValue() === 'Pagada' ? 'Pagada' : 'Pendiente'}
            </label>
          </div>
        ),
        header: () => <span>Estado</span>
      }
    ],
    []
  )

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
  })

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 6
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  return (
    <div>
      <button
        className="ml-4  text-input flex flex-row rounded-sm bg-[#F2F5FA] p-2 "
        onClick={handleAmortizationTable}
      >
        <img src="/refresh.svg" height={20} width={20} />
        <label className="font-sans px-4 text-sm">Actualizar</label>
      </button>

      <div
        className=" flex  mx-4 my-2 overflow-scroll max-h-[300px] text-sm"
        ref={tableContainerRef}
      >
        <table className="w-full table-fixed   table-amortization">
          <thead className="font-medium border-b-4 ">
            {table.getHeaderGroups().map(headerGroup => (
              <tr className="rounded-lg" key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th
                      className="text-center font-light py-2 font-medium "
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler()
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽'
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className=" ">
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}

            {virtualRows.map(virtualRow => {
              const row = rows[virtualRow.index] as Row<any>
              return (
                <>
                  <motion.tr
                    key={row.id}
                    className=" border-b border-b-gray-200 hover:border-l-4 p-2 hover:border-l-[#3C7AC2] "
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <>
                          <td className="py-2 text-center">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        </>
                      )
                    })}
                  </motion.tr>
                </>
              )
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UpdateTableAmortization
