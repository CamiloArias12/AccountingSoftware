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

function TableCreditsDisbursement({
  credits,
  rowSelection,
  setRowSelection
}: {
  credits: Credit[]
  rowSelection: any
  setRowSelection: any
}) {
  const [data, setData] = useState<Credit[]>(credits)
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

  const route = useRouter()
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
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 12
  })
  const { virtualItems: virtualRows } = rowVirtualizer

  return (
    <div className="m-4">
      <div className="flex  flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">
        <div className="mx-4 my-2 flex-grow text-sm">
          <table className="h-full w-full table-fixed table ">
            <thead className="font-medium border-b-4 bg-[#F2F5FA] border-b-[#3C7AC2]">
              {table.getHeaderGroups().map(headerGroup => (
                <tr className="rounded-lg" key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        className="text-start font-light pl-3 py-2 font-medium "
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
              {virtualRows.map(virtualRow => {
                const row = rows[virtualRow.index] as Row<any>
                return (
                  <motion.tr
                    key={row.id}
                    className=" hover:border-l-4  hover:border-l-[#3C7AC2] "
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td className="font-light px-2 ">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableCreditsDisbursement
