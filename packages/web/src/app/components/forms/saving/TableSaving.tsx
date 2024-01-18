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
import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import { Saving } from '@/lib/utils/savings/types'
import OptionsTable from '../../options-table/OptionsTable'
import UpdateSaving from './UpdateFormSaving'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import ViewSaving from './ViewSaving'

function TableSavings({
  savings,
  setShowModalCreate
}: {
  savings: Saving[]
  setShowModalCreate: any
}) {
  console.log(savings)

  const columns = useMemo<ColumnDef<Saving>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        header: () => <span>Id</span>
      },
      {
        accessorKey: 'identification',
        cell: info => info.getValue(),
        header: () => 'Identificación'
      },

      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado'
      },
      {
        accessorKey: 'startDate',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue().split('T', 1)}
            </label>
          </div>
        ),

        header: () => 'Fecha de inicio'
      },
      {
        accessorKey: 'nameSaving',
        cell: info => info.getValue(),
        header: () => <span>Tipo de ahorro</span>
      },
      {
        accessorKey: 'qoutaValue',

        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#F2FFA5] `}>
              $ {row.getValue().toLocaleString()}
            </label>
          </div>
        ),
        header: () => <span>Valor couta</span>
      },
      {
        accessorKey: 'state',
        cell: (row: any) => (
          <div className="py-1">
            <button
              className={` py-1 px-4 font-medium rounded-[30px] ${
                row.getValue()
                  ? 'bg-[#BAF7D0] text-sm  text-[#306E47]'
                  : 'bg-[#FECACA] text-sm'
              }`}
              onClick={() => {}}
            >
              {row.getValue() ? 'Activo' : 'Inactivo'}
            </button>
          </div>
        ),

        header: 'Estado'
      }
    ],
    []
  )

  const [data, setData] = useState<Saving[]>(savings)
  const [showOptions, setShowOptions] = useState(false)
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
    overscan: 14
  })
  const { virtualItems: virtualRows } = rowVirtualizer

  const [update, setUpdate] = useState<boolean>(false)
  const [view, setView] = useState<boolean>(false)
  const [selected, setSelected] = useState<number>(0)
  useEffect(() => {
    setData(savings)
  }, [savings])

  return (
    <>
      {view && <ViewSaving setShow={setView} id={selected} />}
      {update && <UpdateSaving setShowModalUpdate={setUpdate} id={selected} />}
      <div className="flex fleCuentasx-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] pt-8">
        <OptionsTable
          showOptions={showOptions}
          setCreate={() => {
            setShowModalCreate(true)
          }}
          setView={() => {
            setView(true)
          }}
          setUpdate={() => {
            setUpdate(true)
          }}
          search={globalFilter}
          setSearch={setGlobalFilter}
          deleteHandle={() => {}}
        />

        <div className="mx-4 my-2 flex-grow text-sm">
          <table className="w-full table-fixed table ">
            <thead className="font-medium border-b-2 bg-[#F2F5FA] border-b-[#3C7AC2]">
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
                  <>
                    <motion.tr
                      key={row.id}
                      className={` ${
                        selected === row._valuesCache.id && 'selected'
                      } hover:border-l-4  hover:border-l-[#3C7AC2] `}
                    >
                      {row.getVisibleCells().map(cell => {
                        return (
                          <>
                            <td
                              onClick={() => {
                                setShowOptions(true)
                                setSelected(Number(row._valuesCache.id))
                              }}
                              className=" px-2 "
                              key={cell.id}
                            >
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TableSavings
