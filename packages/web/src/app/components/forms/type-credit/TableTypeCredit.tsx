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
import { useRouter } from 'next/navigation'
import { TypeCredit } from '@/lib/utils/type-credit/types'
import { gql, useMutation } from '@apollo/client'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import OptionsTable from '../../options-table/OptionsTable'
import ViewTypeCredit from './ViewTypeCredit'
import TypeCreditUpdate from './TypeCreditUpdate'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import TableInfo from '../../table/TableGeneral'

const DELETE_TYPE_CREDIT = gql`
  mutation ($id: Int!) {
    deleteTypeCredit(id: $id)
  }
`
const UPDATE_TYPE_CREDIT = gql`
  mutation ($data: UpdateTypeCreditInput!, $id: Float!) {
    updateTypeCredit(data: $data, id: $id)
  }
`

function TableTypeCredit({
  typeCredits,
  setShowModalCreate
}: {
  typeCredits: TypeCredit[]
  setShowModalCreate: any
}) {
  console.log(typeCredits)
  const columns = useMemo<ColumnDef<TypeCredit>[]>(
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
      },
      {
        accessorKey: 'interest',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue()} %
            </label>
          </div>
        ),

        header: () => <span>Interés</span>
      }
    ],
    []
  )

  useEffect(() => {
    setData(typeCredits)
  }, [typeCredits])

  const [data, setData] = useState<TypeCredit[]>(typeCredits)
  const [showOptions, setShowOptions] = useState(false)
  const route = useRouter()
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

  const [showView, setShowView] = useState(false)
  const [
    deleteTypeCredit,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_TYPE_CREDIT)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (deleteData) {
      if (deleteData?.deleteTypeCredit) {
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

  const deleteTypeCreditHandle = () => {
    setShowWarning(true)
    deleteTypeCredit({
      variables: {
        id: typeCredits[rowId].id
      }
    })
  }

  return (
    <>
      {showView && (
        <ViewTypeCredit setShow={setShowView} id={typeCredits[rowId].id} />
      )}
      {update && (
        <TypeCreditUpdate
          setShowModal={setUpdate}
          idTypeCredit={typeCredits[rowId].id}
        />
      )}
      <div className="flex h-full w-full flex-col bg-white pb-4 rounded-tr-sm rounded-b-sm md:py-8 md:px-4 gap-2 md:gap-4">
        <div className="flex  flex-col">
          <OptionsTable
            showOptions={showOptions}
            deleteHandle={() => {
              deleteTypeCreditHandle()
            }}
            setUpdate={setUpdate}
            setCreate={() => {
              setShowModalCreate(true)
            }}
            search={globalFilter}
            setSearch={setGlobalFilter}
            setView={() => {
              setShowView(true)
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
      {deleteData?.deleteTypeCredit && showWarning ? (
        <AlertModalSucces value="Se han eliminado el tipo de credito" />
      ) : deleteData?.deleteTypeCredit === false && showWarning ? (
        <AlertModalError value="El tipo de ahorro no se puede eliminar" />
      ) : (
        errorDelete && showWarning && <AlertModalError value="Error" />
      )}
    </>
  )
}

export default TableTypeCredit
