import { Affiliate, Company } from '@/lib/utils/thirds/types'
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
import Table from '../../table/Table'
import {
  use,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useTransition
} from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import CreateThirdCompany from './CreateCompany'
import OptionsTable from '../../options-table/OptionsTable'
import UpdateThirdCompany from './UpdateCompany'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import { PaginationTable } from '../pagination-table/PaginationTable'
import TableInfo from '../../table/TableGeneral'
import { Token } from '@/app/hooks/TokenContext'

export const revalidate = 0
const UPDATE_STATUS = gql`
  mutation ($identification: Int!, $status: Boolean!) {
    updateStatus(identification: $identification, status: $status) {
      identification
    }
  }
`

const DELETE_COMPANY = gql`
  mutation ($id: Float!) {
    deleteCompany(identification: $id)
  }
`

function TableCompany({ companies }: { companies: Company[] }) {
  const [showOptions, setShowOptions] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showView, setShowView] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [rowId, setRowId] = useState<number>(0)
  const [data, setData] = useState<Company[]>(companies)

  const [updateStatus, { data: statusData, loading, error }] =
    useMutation(UPDATE_STATUS)
  const [
    deleteCompany,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_COMPANY)
  const route = useRouter()

  const { context } = Token()
  const deleteCompanyHandle = () => {
    setShowWarning(true)
    deleteCompany({
      variables: {
        id: companies[rowId].identification
      },
      context
    })
  }

  useEffect(() => {
    setData(companies)
  }, [companies])

  useEffect(() => {
    if (statusData) {
      route.refresh()
    }
  }, [statusData])
  useEffect(() => {
    if (deleteData?.deleteCompany) {
      route.refresh()
    }
  }, [deleteData])

  const columns = useMemo<ColumnDef<Company>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Razón social'
      },
      {
        accessorKey: 'typePerson',
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Tipo de persona</span>
      },
      {
        accessorKey: 'typeIdentification',
        header: () => 'Tipo de identificación'
      },
      {
        accessorKey: 'identification',
        header: () => <span>Numero de identificación</span>
      },
      {
        accessorKey: 'legalRepresentativeName',
        header: 'Nombre representate legal'
      },
      {
        accessorKey: 'legalRepresentativeDocument',
        header: 'Identificación representate legal'
      }
    ],
    []
  )

  const [sorting, setSorting] = useState<SortingState>([])

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

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()
  const [showWarning, setShowWarning] = useState(false)
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 12
  })
  const { virtualItems: virtualRows } = rowVirtualizer
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

  return (
    <>
      {showCreate && <CreateThirdCompany setCreate={setShowCreate} />}
      {showUpdate && (
        <UpdateThirdCompany
          identification={companies[rowId].identification}
          setUpdate={setShowUpdate}
        />
      )}

      <div className="flex h-full w-full flex-col bg-white pb-4 rounded-tr-sm rounded-b-sm md:py-8 md:px-4 gap-2 md:gap-4">
        <div className="flex  flex-col">
          <OptionsTable
            showOptions={showOptions}
            setUpdate={() => {
              setShowUpdate(true)
            }}
            setCreate={() => {
              setShowCreate(true)
            }}
            deleteHandle={deleteCompanyHandle}
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

        <div className=" hidden md:flex justify-end">
          <PaginationTable table={table} />
        </div>
      </div>
      {deleteData?.deleteCompany && showWarning ? (
        <AlertModalSucces value="Se han eliminado el tercero" />
      ) : deleteData?.deleteCompany === false && showWarning ? (
        <AlertModalError value="El tercero no se puede eliminar" />
      ) : (
        errorDelete && showWarning && <AlertModalError value="Error" />
      )}
    </>
  )
}

export default TableCompany
