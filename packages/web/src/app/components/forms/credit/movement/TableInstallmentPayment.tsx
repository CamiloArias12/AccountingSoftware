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
import { InstallmentPayment } from '@/lib/utils/credit/types'
import { gql, useMutation } from '@apollo/client'
import { fuzzyFilter } from '../../type-account/TableTypeAccount'
import InputFieldSearch from '@/app/components/input/InputSearch'

function TableInstallmentPayment({
  installmentPayment,
  rowSelection,
  setRowSelection
}: {
  installmentPayment: InstallmentPayment[]
  rowSelection: any
  setRowSelection: any
}) {
  const [data, setData] = useState<InstallmentPayment[]>(installmentPayment)

  console.log(data)
  const columns = useMemo<ColumnDef<InstallmentPayment>[]>(
    () => [
      {
        id: 'select',
        size: 40,
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
          </div>
        )
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
        header: () => <span>Cuota</span>,
        size: 50
      },
      {
        accessorKey: 'identification',
        cell: info => info.getValue(),
        header: () => <span>Identificación</span>,
        size: 100
      },

      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado',
        size: 200
      },
      {
        accessorKey: 'interest',
        cell: info => info.getValue() + ' %',
        header: () => <span>Interés</span>,
        size: 50
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

        header: () => <span>Fecha de pago</span>,
        size: 100
      },
      {
        accessorKey: 'capital',
        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => <span>Capital</span>,
        size: 100
      },
      {
        accessorKey: 'interestPayment',
        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => <span>Pago interés</span>,
        size: 100
      },
      {
        accessorKey: 'totalPayment',
        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => <span>Total pago</span>,
        size: 100
      }
    ],
    []
  )

  const [globalFilter, setGlobalFilter] = useState('')
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },

    state: {
      rowSelection,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
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
    overscan: rows.length
  })
  const { virtualItems: virtualRows } = rowVirtualizer

  return (
    <>
      <div className="bg-[#FBFBFB] p-2 shadow-md">
        <InputFieldSearch
          value={globalFilter}
          onChange={e => {
            setGlobalFilter(String(e.target.value))
          }}
        />
      </div>
      <div className="flex  max-h-[400px] 2xl:max-h-[600px]  overflow-scroll ">
        <table className="flex-grow  table-fixed table ">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr className="rounded-lg " key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th
                      className="text-start  pl-3 font-semibold"
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ minWidth: header.getSize() }}
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
                  className="  hover:border-l-4 p-2 hover:border-l-[#3C7AC2] "
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td className=" px-2 ">
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
    </>
  )
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + 'cursor-pointer'}
      {...rest}
    />
  )
}
export default TableInstallmentPayment
