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
import OptionsTable from '../../options-table/OptionsTable'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import TableInfo from '../../table/TableGeneral'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import ViewDisbursement from './ViewDisburment'
import { Token } from '@/app/hooks/TokenContext'

const DELETE_MOVEMENT = gql`
  mutation ($id: String!) {
    deleteMovementById(id: $id) {
      state
      message
    }
  }
`

function TableDisburment({
  disbursement
}: {
  disbursement: any
  rowSelection: any
  setRowSelection: any
}) {
  const [data, setData] = useState<any[]>(disbursement)

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

  const [showOptions, setShowOptions] = useState(false)
  const { context } = Token()
  const [showView, setShowView] = useState<boolean>(false)
  const [
    deleteMovement,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_MOVEMENT)

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
    getFilteredRowModel: getFilteredRowModel()
  })

  const route = useRouter()
  const [showWarningDelete, setShowWarningDelete] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWarningDelete(false)
    }, 3000) // 3 seconds in milliseconds

    return () => {
      clearTimeout(timeout)
    }
  }, [deleteData, errorDelete])

  useEffect(() => {
    if (deleteData?.deleteMovementById) {
      route.refresh()
    }
  }, [deleteData])
  useEffect(() => {
    setData(disbursement)
  }, [disbursement])

  return (
    <>
      {showView && (
        <ViewDisbursement
          setView={setShowView}
          idMovement={disbursement[rowId].id}
        />
      )}
      <div className="flex h-full w-full flex-col bg-white pb-4 rounded-tr-sm rounded-b-sm md:px-4 gap-2 md:gap-4">
        <div className="flex  flex-col">
          <OptionsTable
            showOptions={showOptions}
            setView={setShowView}
            createRoute="/dashboard/treasury/disbursement/create"
            search={globalFilter}
            setSearch={setGlobalFilter}
            deleteHandle={() => {
              setShowWarningDelete(true)
              deleteMovement({
                variables: {
                  id: disbursement[rowId].id
                },
                context
              })
            }}
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

export default TableDisburment
