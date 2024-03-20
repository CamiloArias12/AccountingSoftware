'use client'
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import OptionsTable from '../../options-table/OptionsTable'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import CreateRole from './CreateRole'
import UpdateRole from './UpdateRole'
import TableInfo from '../../table/TableGeneral'

function TableRoles({ roles }: { roles: any }) {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        header: () => <span>Id</span>
      },

      {
        accessorKey: 'name',
        cell: info => info.getValue(),
        header: () => 'Nombre'
      }
    ],
    []
  )

  const [data, setData] = useState<any>(roles)
  const [showOptions, setShowOptions] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowId, setRowId] = useState<number>(0)
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

  const [update, setUpdate] = useState<boolean>(false)
  const [create, setCreate] = useState<boolean>(false)
  useEffect(() => {
    setData(roles)
  }, [roles])

  return (
    <>
      {create && <CreateRole setShowModalCreate={setCreate} />}
      {update && (
        <UpdateRole setShowModalUpdate={setUpdate} id={roles[rowId].id} />
      )}
      <div className="flex fleCuentasx-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] gap-4 ">
        <div className="flex  flex-col">
          <OptionsTable
            showOptions={showOptions}
            setCreate={() => {
              setCreate(true)
            }}
            setUpdate={() => {
              setUpdate(true)
            }}
            search={globalFilter}
            setSearch={setGlobalFilter}
            deleteHandle={() => {}}
          />
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

export default TableRoles
