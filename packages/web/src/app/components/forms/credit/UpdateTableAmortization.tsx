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
import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import { AmortizationTable } from '@/lib/utils/credit/types'
import InputNumber from '../../input/InputNumber'
import { NumericFormat } from 'react-number-format'

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
        cell: (row: any) => <>{row.getValue().split('T', 1)}</>,
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
  })

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  return (
    <div className="flex flex-grow flex-col overflow-scroll">
      <button
        className="ml-4  text-input flex flex-row rounded-sm bg-[#F2F5FA] p-2 "
        onClick={handleAmortizationTable}
      >
        <img src="/refresh.svg" height={20} width={20} />
        <label className="font-sans px-4 text-sm">Actualizar</label>
      </button>

      <div
        className=" flex flex-grow  mx-4 my-2 overflow-scroll  text-sm"
        ref={tableContainerRef}
      >
        <table className="w-full h-8 flex-grow table-fixed table-amortization ">
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
                          <td className=" text-center">
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
