import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import OptionsTable from '../../options-table/OptionsTable'
import ViewDefferedDetails from './ViewDeffered'
import { gql, useMutation } from '@apollo/client'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import { PaginationTable } from '../pagination-table/PaginationTable'
import TableInfo from '../../table/TableGeneral'
import { Token } from '@/app/hooks/TokenContext'

const DELETE_MOVEMENT = gql`
  mutation ($id: String!) {
    deleteMovementById(id: $id) {
      state
      message
    }
  }
`

function TableDeferred({
  deferreds,
  rowSelection,
  setRowSelection
}: {
  deferreds: any
  rowSelection: any
  setRowSelection: any
}) {
  const [data, setData] = useState<any[]>(deferreds)

  const { context } = Token()
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        header: () => <span>Id</span>
      },
      {
        accessorKey: 'date',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue().split('T', 1)}
            </label>
          </div>
        ),

        header: () => <span>Fecha</span>
      },
      {
        accessorKey: 'concept',
        cell: info => info.getValue(),
        header: () => <span>Concepto</span>
      }
    ],
    []
  )

  const [sorting, setSorting] = useState<SortingState>([])
  const [rowId, setRowId] = useState<number>(0)
  const [showOptions, setShowOptions] = useState(false)
  const [showView, setShowView] = useState<boolean>(false)
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

  const [
    deleteMovement,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_MOVEMENT)
  const route = useRouter()

  const [showWarningDelete, setShowWarningDelete] = useState(false)

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
    setData(deferreds)
  }, [deferreds])

  return (
    <>
      {showView && (
        <ViewDefferedDetails
          idMovement={deferreds[rowId].id}
          setView={setShowView}
        />
      )}
      <div className="flex h-full w-full flex-col bg-white pb-4 rounded-tr-sm rounded-b-sm md:py-8 md:px-4 gap-2 md:gap-4">
        <div className="flex  flex-col">
          <OptionsTable
            showOptions={showOptions}
            setView={setShowView}
            createRoute={`/dashboard/wallet/deferred/create`}
            deleteHandle={() => {
              setShowWarningDelete(true)
              deleteMovement({
                variables: {
                  id: deferreds[rowId].id
                },
                context
              })
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

export default TableDeferred
