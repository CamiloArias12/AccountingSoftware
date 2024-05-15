import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react'

import { Movement } from '@/lib/utils/accounting/types'
import OptionsTable from '../../options-table/OptionsTable'
import ViewMovementAccount from './ViewAccountMovement'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import { PaginationTable } from '../pagination-table/PaginationTable'
import TableInfo from '../../table/TableGeneral'

export const revalidate = 0
function TableMovements({ movements }: { movements: Movement[] }) {
  console.log(movements)
  const columns = useMemo<ColumnDef<Movement>[]>(
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
        accessorKey: 'id',
        cell: info => info.getValue(),
        header: () => <span>Id</span>
      },
      {
        accessorKey: 'date',
        cell: (row: any) => (
          <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
            {row.getValue().split('T', 1)}
          </label>
        ),

        header: () => 'Fecha'
      },
      {
        accessorKey: 'concept',
        cell: info => info.getValue(),
        header: () => <span>Concepto</span>
      },
      {
        accessorKey: 'state',
        cell: (row: any) => (
          <label
            className={` py-1 px-4 font-medium rounded-[30px] ${
              row.getValue()
                ? 'bg-[#BAF7D0] text-sm  text-[#306E47]'
                : 'bg-[#FECACA] text-sm'
            }`}
          >
            {row.getValue() ? 'Activo' : 'Inactivo'}
          </label>
        ),

        header: 'Estado'
      },
      {
        accessorKey: 'accounting',
        cell: info => info.getValue(),
        header: () => <span>Contabilizacion</span>
      }
    ],
    []
  )

  const [data, setData] = useState<Movement[]>(movements)
  const [showOptions, setShowOptions] = useState(false)
  const [rowId, setRowId] = useState<number>(0)
  const [rowSelection, setRowSelection] = useState({})
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
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onRowSelectionChange: setRowSelection,
    debugTable: true
  })

  const [showView, setShowView] = useState<boolean>(false)

  const [movementsSelected, setMovementsSelected] = useState<string[]>([])

  useEffect(() => {
    if (Object.keys(rowSelection).length > 0) {
      setShowOptions(true)
    } else {
      setShowOptions(false)
    }
  }, [rowSelection])

  useEffect(() => {
    setData(movements)
  }, [movements])

  return (
    <>
      {showView && (
        <ViewMovementAccount
          setView={setShowView}
          movements={movementsSelected}
        />
      )}
      <div className="flex h-full w-full flex-col bg-white pb-4 rounded-tr-sm rounded-b-sm md:py-8 md:px-4 gap-2 md:gap-4">
        <div className="flex  flex-col">
          <OptionsTable
            showOptions={showOptions}
            setView={() => {
              const movementsShow = []
              for (const key in rowSelection) {
                if (rowSelection.hasOwnProperty(key)) {
                  movementsShow.push(movements[Number(key)].id)
                }
              }
              setMovementsSelected(movementsShow)
              if (movementsShow.length > 0) {
                setShowView(true)
              }
            }}
            search={globalFilter}
            setSearch={setGlobalFilter}
          />
        </div>
        <div className=" flex md:hidden justify-end px-2 ">
          <PaginationTable table={table} />
        </div>
        <TableInfo
          table={table}
          className="account-table"
          rowId={rowId}
          setRow={setRowId}
          setOptions={setShowOptions}
          key={1}
        />
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

export default TableMovements
