import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Saving } from '@/lib/utils/savings/types'
import OptionsTable from '../../options-table/OptionsTable'
import UpdateSaving from './UpdateFormSaving'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import ViewSaving from './ViewSaving'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import { useRouter } from 'next/navigation'
import { PaginationTable } from '../pagination-table/PaginationTable'
import { format } from 'date-fns'
import TableInfo from '../../table/TableGeneral'
import { Token } from '@/app/hooks/TokenContext'

const DELETE_SAVING = gql`
  mutation DeleteSaving($id: Int!) {
    deleteSaving(id: $id)
  }
`

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
        header: () => <span>Id</span>,
        size: 80
      },
      {
        accessorKey: 'identification',
        cell: info => info.getValue(),
        header: () => 'Identificación',
        minSize: 150
      },

      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado',

        minSize: 160
      },

      {
        accessorKey: 'startDate',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {format(new Date(row.getValue()), 'dd-MM-yyyy')}
            </label>
          </div>
        ),

        header: () => 'Fecha de inicio',
        minSize: 150
      },
      {
        accessorKey: 'nameSaving',
        cell: info => info.getValue(),
        header: () => <span>Tipo de ahorro</span>,
        minSize: 130
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
        header: () => <span>Valor cuota</span>,
        minSize: 120
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

        header: 'Estado',
        minSize: 70
      }
    ],
    []
  )

  const { context } = Token()
  const [data, setData] = useState<Saving[]>(savings)
  const [showOptions, setShowOptions] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowId, setRowId] = useState<number>(0)
  const [
    deleteSaving,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_SAVING)

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
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
  })

  const [update, setUpdate] = useState<boolean>(false)
  const [view, setView] = useState<boolean>(false)
  const route = useRouter()
  const [showWarningDelete, setShowWarningDelete] = useState(false)
  useEffect(() => {
    setData(savings)
  }, [savings])
  useEffect(() => {
    if (deleteData) {
      if (deleteData?.deleteSaving) {
        route.refresh()
      }

      console.log('delete')
      const timeout = setTimeout(() => {
        setShowWarningDelete(false)
      }, 3000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [deleteData, errorDelete])

  return (
    <>
      {view && <ViewSaving setShow={setView} id={savings[rowId].id} />}
      {update && (
        <UpdateSaving setShowModalUpdate={setUpdate} id={savings[rowId].id} />
      )}
      <div className="flex h-full w-full flex-col bg-white pb-4 rounded-tr-sm rounded-b-sm md:py-8 md:px-4 gap-2 md:gap-4">
        <div className="flex  flex-col">
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
            deleteHandle={() => {
              setShowWarningDelete(true)
              deleteSaving({
                variables: {
                  id: savings[rowId].id
                },
                context
              })
            }}
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

        <div className=" hidden md:flex justify-end">
          <PaginationTable table={table} />
        </div>
      </div>
      {deleteData?.deleteSaving && showWarningDelete ? (
        <AlertModalSucces value="Se ha eliminado el ahorro" />
      ) : deleteData?.deleteSaving === false && showWarningDelete ? (
        <AlertModalError value="El ahorro no se puede eliminar" />
      ) : (
        errorDelete && showWarningDelete && <AlertModalError value="Error" />
      )}
    </>
  )
}

export default TableSavings
