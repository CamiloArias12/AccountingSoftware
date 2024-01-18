import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react'

import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import { Movement } from '@/lib/utils/accounting/types'
import OptionsTable from '../../options-table/OptionsTable'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import ViewMovementAccount from './ViewAccountMovement'
import { fuzzyFilter } from '../type-account/TableTypeAccount'

export const revalidate = 0
const DELETE_MOVEMENT = gql`
  mutation ($id: String!) {
    deleteMovementById(id: $id) {
      state
      message
    }
  }
`

function TableMovements({ movements }: { movements: Movement[] }) {
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

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 12
  })
  const { virtualItems: virtualRows } = rowVirtualizer

  const [showView, setShowView] = useState<boolean>(false)

  const route = useRouter()

  const [showWarningDelete, setShowWarningDelete] = useState(false)
  const [movementsSelected, setMovementsSelected] = useState<string[]>([])

  const [
    deleteMovement,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_MOVEMENT)

  useEffect(() => {
    if (deleteData) {
      route.refresh()
      const timeout = setTimeout(() => {
        setShowWarningDelete(false)
      }, 3000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [deleteData, errorDelete])

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
          setShowView(true)
        }}
        deleteHandle={() => {
          setShowWarningDelete(true)
          deleteMovement({
            variables: {
              id: movements[Object.keys(rowSelection)[0]].id
            }
          })
        }}
        search={globalFilter}
        setSearch={setGlobalFilter}
      />

      <div className="flex px-4 flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">
        <div className=" flex-grow text-sm">
          <table className="h-full w-full table-fixed table ">
            <thead className="font-medium ">
              {table.getHeaderGroups().map(headerGroup => (
                <tr className="rounded-lg  " key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        className="text-start  pl-3 py-2 font-medium "
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
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
              {virtualRows.map(virtualRow => {
                const row = rows[virtualRow.index] as Row<any>
                return (
                  <>
                    <motion.tr
                      key={row.id}
                      className={`  hover:border-l-4  hover:border-l-[#3C7AC2] `}
                    >
                      {row.getVisibleCells().map(cell => {
                        return (
                          <td key={cell.id}>
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
      {deleteData?.deleteMovementById.state && showWarningDelete ? (
        <AlertModalSucces value={deleteData.deleteMovementById.message} />
      ) : deleteData?.deleteMovementById.state === false &&
        showWarningDelete ? (
        <AlertModalError value={deleteData.deleteMovementById.message} />
      ) : (
        errorDelete && showWarningDelete && <AlertModalError value="Error" />
      )}
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
