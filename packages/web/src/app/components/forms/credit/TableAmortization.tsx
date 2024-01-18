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
import SplashScreen from '../../splash/Splash'
import { NumericFormat } from 'react-number-format'

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
        cell: (row: any) => <>{row.getValue().split('T', 1)}</>,

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
    overscan: 8
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0
  console.log(data)
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

      <div
        className=" flex   my-2 overflow-scroll  text-sm"
        style={{ minHeight: 'auto' }}
        ref={tableContainerRef}
      >
        <table className="w-full table-fixed table-amortization ">
          <thead className="font-medium  bg-[#F2F5FA] ">
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
                    className=" border border-b-gray-200 hover:border-l-4 p-2 hover:border-l-[#3C7AC2] "
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
    </>
  )
}

export default TableAmortization
