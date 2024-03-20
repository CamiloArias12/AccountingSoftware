'use client'

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  Row,
  Table,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react'

import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import { PaginationTable } from '../pagination-table/PaginationTable'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import { bookAuxiliary } from '@/lib/utils/accounting/options'
import ClickOutside from '../../input/ClickOutSide'

export const revalidate = 0

function TableBookAuxiliary({ movements }: { movements: any }) {
  const defaultColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'date',
        cell: (row: any) => (
          <>
            {row.getValue() && (
              <span className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
                {row?.getValue()?.split('T', 1)}
              </span>
            )}
          </>
        ),
        minSize: 120,
        header: () => bookAuxiliary.date
      },
      {
        accessorKey: 'typeMovement',
        cell: info => info.getValue(),
        minSize: 180,
        header: () => bookAuxiliary.typeMovement
      },
      {
        accessorKey: 'idMovement',
        cell: info => info.getValue(),
        minSize: 120,
        header: () => bookAuxiliary.idMovement
      },
      {
        accessorKey: 'concept',
        cell: info => info.getValue(),
        minSize: 180,
        header: () => bookAuxiliary.concept
      },
      {
        accessorKey: 'identificationThird',
        cell: info => info.getValue(),
        minSize: 180,
        header: () => bookAuxiliary.identificationThird
      },
      {
        accessorKey: 'nameThird',
        cell: info => info.getValue(),
        minSize: 180,
        header: () => bookAuxiliary.nameThird
      },
      {
        accessorKey: 'code',
        cell: info => info.getValue(),
        minSize: 100,
        header: () => bookAuxiliary.code
      },
      {
        accessorKey: 'nameAccount',
        cell: info => info.getValue(),
        minSize: 200,
        header: () => bookAuxiliary.nameAccount
      },
      {
        accessorKey: 'previusBalance',
        cell: info => '$ ' + info.getValue().toLocaleString(),
        minSize: 150,
        header: () => bookAuxiliary.previusBalance
      },
      {
        accessorKey: 'debit',
        cell: info => '$ ' + info.getValue().toLocaleString(),
        minSize: 150,
        header: () => bookAuxiliary.debit
      },
      {
        accessorKey: 'credit',
        cell: info => '$ ' + info.getValue().toLocaleString(),
        minSize: 150,
        header: () => bookAuxiliary.credit
      },
      {
        accessorKey: 'total',
        cell: info => '$ ' + info.getValue().toLocaleString(),
        minSize: 150,
        header: () => bookAuxiliary.total
      }
    ],
    []
  )

  const [data, setData] = useState<any[]>(movements)
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },

    state: {
      globalFilter,
      columnFilters,
      columnVisibility
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onRowSelectionChange: setRowSelection,
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

  const [movementsSelected, setMovementsSelected] = useState<string>(null)

  useEffect(() => {
    setData(movements)
  }, [movements])

  const [toggle, setToggle] = useState<boolean>(false)
  return (
    <>
      <div className="flex h-full w-full flex-col bg-white pb-4 rounded-tr-sm rounded-b-sm md:py-8 md:px-4 gap-2 md:gap-4">
        <ClickOutside
          onClick={() => {
            setToggle(false)
          }}
          className="bg-gray-100 w-48 shadow rounded"
        >
          <div className="px-1  flex flex-row justify-between items-center">
            <label className="flex flex-row gap-2">
              <input
                className={` ${
                  toggle && ' border-2 border-blue-500 '
                } bg-white relative w-100 flex cursor-pointer gap-2 flex-row  rounded-md items-center  border focus:outline-2 focus:outline-[rgb(59,130,246)]  pl-2  text-left `}
                {...{
                  type: 'checkbox',
                  checked: table.getIsAllColumnsVisible(),
                  onChange: table.getToggleAllColumnsVisibilityHandler()
                }}
              />{' '}
              <span>Mostrar</span>
            </label>
            <motion.svg
              className={'mr-2 cursor-pointer'}
              fill={'#000000'}
              height={15}
              width={15}
              viewBox="-6.5 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setToggle(!toggle)
              }}
            >
              <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
            </motion.svg>
          </div>

          <div className={`flex flex-grow mt-1 ${!toggle && 'hidden'} `}>
            <div className=" flex flex-col w-52 absolute z-10  flex-grow bg-white shadow-lg max-h-100 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none">
              {table.getAllLeafColumns().map(column => {
                return (
                  <div key={column.id} className="px-1">
                    <label>
                      <input
                        {...{
                          type: 'checkbox',
                          checked: column.getIsVisible(),
                          onChange: column.getToggleVisibilityHandler()
                        }}
                      />{' '}
                      {bookAuxiliary[column.id]}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        </ClickOutside>
        <div className=" flex md:hidden justify-end px-2 ">
          <PaginationTable table={table} />
        </div>

        <div className=" md:mx-4 overflow-scroll  flex  container-table ">
          <table className=" w-screen md:w-full flex-grow md:h-auto  account-table ">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr className="rounded-lg  " key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        className="text-start  pl-3 py-2 font-semibold"
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ minWidth: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : (
                          <>
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
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </>
                        )}{' '}
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
                  <>
                    <motion.tr
                      key={row.id}
                      className={` ${movementsSelected === row.id && 'selected'} hover:border-l-4  hover:border-l-[#3C7AC2] `}
                    >
                      {row.getVisibleCells().map(cell => {
                        return (
                          <td
                            key={cell.id}
                            onClick={() => {
                              setMovementsSelected(row.id)
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        )
                      })}
                    </motion.tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function Filter({
  column,
  table
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min `}
          className="w-24 border shadow text-black rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="w-24 border text-black shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        className="w-40 text-black border shadow rounded"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  )
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

export default TableBookAuxiliary
