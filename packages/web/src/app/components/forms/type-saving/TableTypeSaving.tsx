import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TypeSaving } from '@/lib/utils/type-saving/types'
import { gql, useMutation } from '@apollo/client'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import OptionsTable from '../../options-table/OptionsTable'
import ViewTypeSaving from './ViewTypeSaving'
import TypeSavingUpdate from './TypeSavingUpdate'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import TableInfo from '../../table/TableGeneral'

const DELETE_TYPE_SAVING = gql`
  mutation ($id: Int!) {
    deleteTypeSaving(id: $id)
  }
`
const UPDATE_TYPE_SAVING = gql`
  mutation ($data: UpdateTypeSavingInput!, $id: Float!) {
    updateTypeSaving(data: $data, id: $id)
  }
`

function TableTypeSaving({
  typeSavings,
  setShowModalCreate
}: {
  typeSavings: TypeSaving[]
  setShowModalCreate: any
}) {
  const columns = useMemo<ColumnDef<TypeSaving>[]>(
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

  const [data, setData] = useState<TypeSaving[]>(typeSavings)
  const [showOptions, setShowOptions] = useState(false)
  const route = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    setData(typeSavings)
  }, [typeSavings])
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

  const [rowId, setRowId] = useState<number>(0)
  const [update, setUpdate] = useState<boolean>(false)
  const [showView, setShowView] = useState(false)
  const [
    deleteTypeSaving,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_TYPE_SAVING)
  const [showWarning, setShowWarning] = useState(false)
  useEffect(() => {
    if (deleteData?.deleteTypeSaving) {
      route.refresh()
    }
  }, [deleteData])

  const deleteTypeSavingHandle = () => {
    setShowWarning(true)
    deleteTypeSaving({
      variables: {
        id: typeSavings[rowId].id
      }
    })
  }

  useEffect(() => {
    if (deleteData) {
      if (deleteData?.deleteTypeSaving) {
        route.refresh()
        setShowOptions(false)
      }

      console.log('delete')
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 5000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [deleteData, errorDelete])

  return (
    <>
      {showView && (
        <ViewTypeSaving id={typeSavings[rowId].id} setShow={setShowView} />
      )}
      {update && (
        <TypeSavingUpdate
          idTypeSaving={typeSavings[rowId].id}
          setShow={setUpdate}
        />
      )}
      <div className="flex h-full w-full flex-col bg-white pb-4 rounded-tr-sm rounded-b-sm md:py-8 md:px-4 gap-2 md:gap-4">
        <div className="flex  flex-col">
          <OptionsTable
            showOptions={showOptions}
            deleteHandle={() => {
              deleteTypeSavingHandle()
            }}
            setUpdate={setUpdate}
            setCreate={() => {
              setShowModalCreate(true)
            }}
            setView={setShowView}
            search={globalFilter}
            setSearch={setGlobalFilter}
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
      {deleteData?.deleteTypeSaving && showWarning ? (
        <AlertModalSucces value="Se ha eliminado el tipo de ahorro" />
      ) : deleteData?.deleteTypeSaving === false && showWarning ? (
        <AlertModalError value="El tipo de ahorro no se puede eliminar" />
      ) : (
        errorDelete && showWarning && <AlertModalError value="Error" />
      )}
    </>
  )
}

export default TableTypeSaving
