import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react'
import OptionsTable from '../../options-table/OptionsTable'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import TableInfo from '../../table/TableGeneral'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import AlertModalError from '../../modal/AlertModalError'
import AlertModalSucces from '../../modal/AlertModalSucces'
import { Token } from '@/app/hooks/TokenContext'

const DELETE_MOVEMENT = gql`
  mutation ($id: String!) {
    deleteMovementById(id: $id) {
      state
      message
    }
  }
`

const IS_UPDATE_MOVEMENT = gql`
  query IsUpdateNote($idMovement: String!) {
    isUpdateNote(idMovement: $idMovement) {
      message
      state
    }
  }
`
function TableNote({
  notes
}: {
  notes: any
  rowSelection: any
  setRowSelection: any
}) {
  const [data, setData] = useState<any[]>(notes)

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

  const { context } = Token()
  const [sorting, setSorting] = useState<SortingState>([])
  const [
    deleteMovement,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_MOVEMENT)
  const [
    isUpdate,
    { data: dataIsUpdate, loading: loadingIsUpdate, error: errorIsUpdate }
  ] = useLazyQuery(IS_UPDATE_MOVEMENT)

  const [showOptions, setShowOptions] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [showWarningDelete, setShowWarningDelete] = useState(false)
  const [showView, setShowView] = useState<boolean>(false)
  const route = useRouter()
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
    if (dataIsUpdate) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 1000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dataIsUpdate, errorIsUpdate])

  useEffect(() => {
    setData(notes)
  }, [notes])

  if (dataIsUpdate?.isUpdateNote?.state) {
    route.push(`/dashboard/accounting/notes/update/${notes[rowId].id}`)
  }
  return (
    <>
      <div className="flex h-full w-full flex-col bg-white pb-4 rounded-tr-sm rounded-b-sm  md:px-4 gap-2 md:gap-4">
        <div className="flex  flex-col">
          <OptionsTable
            showOptions={showOptions}
            createRoute="/dashboard/accounting/notes/create"
            setUpdate={() => {
              setShowWarning(true)
              isUpdate({ variables: { idMovement: notes[rowId].id }, context })
            }}
            search={globalFilter}
            setSearch={setGlobalFilter}
            deleteHandle={() => {
              setShowWarningDelete(true)
              deleteMovement({
                variables: {
                  id: notes[rowId].id
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

      {dataIsUpdate?.isUpdateNote.state === false && showWarning ? (
        <AlertModalError value={dataIsUpdate?.isUpdateNote.message} />
      ) : (
        errorIsUpdate && showWarning && <AlertModalError value="Error" />
      )}
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

export default TableNote
