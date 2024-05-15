import { Affiliate } from '@/lib/utils/thirds/types'
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import OptionsTable from '../../options-table/OptionsTable'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import { PaginationTable } from '../pagination-table/PaginationTable'
import TableInfo from '../../table/TableGeneral'
import { Token } from '@/app/hooks/TokenContext'

export const revalidate = 0
const UPDATE_STATUS = gql`
  mutation ($identification: Float!, $status: Boolean!) {
    updateStatus(identification: $identification, status: $status) {
      identification
    }
  }
`

const DELETE_USER = gql`
  mutation ($identification: Float!) {
    deleteUser(identification: $identification)
  }
`

function TableThirds({ affiliates }: { affiliates: Affiliate[] }) {
  console.log(affiliates)
  const [showOptions, setShowOptions] = useState(false)
  const [rowId, setRowId] = useState<number>(0)
  const [data, setData] = useState<Affiliate[]>(affiliates)
  const [showWarning, setShowWarning] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const [updateStatus, { data: statusData, loading, error }] =
    useMutation(UPDATE_STATUS)
  const [
    deleteUser,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_USER)
  const route = useRouter()

  const { context } = Token()
  const deleteUserHandle = () => {
    setShowWarning(true)
    deleteUser({
      variables: {
        identification: affiliates[rowId].identification
      },
      context
    })
  }
  const updateUser = (identification: number, status: boolean) => {
    updateStatus({
      variables: {
        identification: identification,
        status: status
      },
      context
    })
  }

  useEffect(() => {
    setData(affiliates)
  }, [affiliates])

  useEffect(() => {
    if (statusData) {
      route.refresh()
    }
  }, [statusData])
  useEffect(() => {
    if (deleteData?.deleteUser) {
      route.refresh()
    }
  }, [deleteData])

  const columns = useMemo<ColumnDef<Affiliate>[]>(
    () => [
      {
        accessorKey: 'identification',
        header: 'Identificación',
        minSize: 150
      },
      {
        accessorFn: row => `${row.name} ${row.lastName}`,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Nombres</span>,

        minSize: 200
      },
      {
        accessorKey: 'phone',
        header: () => 'Teléfono'
      },
      {
        accessorKey: 'cityResidence',
        header: 'Ciudad'
      },
      {
        accessorKey: 'status',
        cell: (row: any) => (
          <div className="py-1">
            <button
              className={` py-1 px-4 font-medium rounded-[30px] ${
                row.getValue()
                  ? 'bg-[#BAF7D0] text-sm  text-[#306E47]'
                  : 'bg-[#FECACA] text-sm'
              }`}
              onClick={() => {
                updateUser(row.row._valuesCache.identification, !row.getValue())
              }}
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

  const [sorting, setSorting] = useState<SortingState>([])

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

  useEffect(() => {
    if (deleteData) {
      if (deleteData?.deleteAccount) {
        route.refresh()
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

  useEffect(() => {
    deleteData?.deleteUser && setShowOptions(false)
  }, [deleteData])

  return (
    <>
      <div className="flex h-full w-full flex-col md:shadow-lg bg-white pb-4 rounded-tr-sm rounded-b-sm md:py-8 md:px-4 gap-2 md:gap-4">
        <div className="flex  flex-col">
          <OptionsTable
            showOptions={showOptions}
            search={globalFilter}
            setSearch={setGlobalFilter}
            viewRoute={`/dashboard/parametrization/thirds/${affiliates[rowId]?.identification}`}
            createRoute="/dashboard/parametrization/thirds/create"
            updateRoute={`/dashboard/parametrization/thirds/update/${affiliates[rowId]?.identification}`}
            deleteHandle={deleteUserHandle}
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
      {deleteData?.deleteUser && showWarning ? (
        <AlertModalSucces value="Se han eliminado el tercero" />
      ) : deleteData?.deleteUser === false && showWarning ? (
        <AlertModalError value="El tercero no se puede eliminar" />
      ) : (
        errorDelete && showWarning && <AlertModalError value="Error" />
      )}
    </>
  )
}

export default TableThirds
