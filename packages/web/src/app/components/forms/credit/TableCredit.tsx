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
import { useRouter } from 'next/navigation'
import { Credit } from '@/lib/utils/credit/types'
import { gql, useMutation } from '@apollo/client'
import AlertModalError from '../../modal/AlertModalError'
import AlertModalSucces from '../../modal/AlertModalSucces'
import OptionsTable from '../../options-table/OptionsTable'
import { downloadCreditPdf, downloadCreditXlsx } from '@/lib/axios/uploadFiles'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import { PaginationTable } from '../pagination-table/PaginationTable'
import { format } from 'date-fns'
import TableInfo from '../../table/TableGeneral'
import { Token } from '@/app/hooks/TokenContext'

const REFINANCE = gql`
  mutation ($id: Int!) {
    isRefinance(id: $id) {
      state
      message
    }
  }
`

const DELETE_CREDIT = gql`
  mutation ($id: Int!) {
    deleteCredit(id: $id)
  }
`
function TableCredits({ credits }: { credits: Credit[] }) {
  const columns = useMemo<ColumnDef<Credit>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        header: () => <span>Id</span>,
        size: 70
      },
      {
        accessorKey: 'identification',
        cell: info => info.getValue(),
        header: () => 'Identificación'
      },

      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado',
        size: 150
      },

      {
        accessorKey: 'creditValue',
        accessorFn: row => row.creditValue + row.valuePrevius,
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#FFF1CD] `}>
              {' '}
              $ {row.getValue().toLocaleString()}
            </label>
          </div>
        ),

        header: () => <span>Monto</span>,
        size: 150
      },
      {
        accessorKey: 'nameCredit',
        cell: info => info.getValue(),
        header: () => <span>Tipo de crédito</span>,
        size: 150
      },
      {
        accessorKey: 'discountDate',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {format(new Date(row.getValue()), 'dd-MM-yyyy')}
            </label>
          </div>
        ),

        header: () => <span>Fecha de descuento</span>,
        size: 150
      },
      {
        accessorKey: 'interest',
        cell: info => info.getValue() + ' %',
        header: () => <span>Interés</span>,
        size: 70
      },
      {
        accessorKey: 'state',
        cell: (row: any) => (
          <div className="py-1">
            <label
              className={` py-1 px-4 text-sm rounded-[30px] font-medium ${
                row.getValue() === 'Aprobado'
                  ? 'bg-[#BAF7D0] text-sm  text-[#306E47]'
                  : row.getValue() === 'En curso'
                    ? 'bg-[#ECFF1C]  text-[#9F9431]'
                    : 'bg-[#F9E8BD] text-[#8A6914]'
              }`}
            >
              {row.getValue()}
            </label>
          </div>
        ),
        header: () => <span>Estado</span>,
        size: 100
      }
    ],
    []
  )

  const { context } = Token()
  const [data, setData] = useState<Credit[]>(credits)
  const [showOptions, setShowOptions] = useState(false)
  const route = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [
    isRefinance,
    { data: dataRefinance, loading: loadingRefinance, error: errorRefinance }
  ] = useMutation(REFINANCE)
  const [
    deleteCredit,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_CREDIT)

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

  const [showDownload, setShowDownload] = useState<boolean>(false)
  const [rowId, setRowId] = useState<number>(0)
  const [showWarning, setShowWarning] = useState(false)
  const [showWarningDelete, setShowWarningDelete] = useState(false)

  useEffect(() => {
    setData(credits)
  }, [credits])

  useEffect(() => {
    if (dataRefinance) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 1000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dataRefinance, errorRefinance])

  const deleteCreditHandle = () => {
    setShowWarningDelete(true)
    deleteCredit({
      variables: {
        id: credits[rowId].id
      },
      context
    })
  }

  const handleRefinance = (id: number) => {
    setShowWarning(true)
    isRefinance({
      variables: {
        id: credits[rowId].id
      },
      context
    })
  }
  useEffect(() => {
    if (deleteData) {
      if (deleteData?.deleteCredit) {
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

  if (dataRefinance?.isRefinance.state) {
    route.push(`/dashboard/wallet/credit/refinance/${credits[rowId]?.id}`)
  }

  return (
    <>
      <div className="flex h-full w-full flex-col bg-white pb-4 rounded-tr-sm rounded-b-sm md:py-8 md:px-4 gap-2 md:gap-4">
        <div className="flex  flex-col">
          <OptionsTable
            showOptions={showOptions}
            deleteHandle={() => {
              deleteCreditHandle()
            }}
            updateRoute={`/dashboard/wallet/credit/update/${credits[rowId]?.id}`}
            viewRoute={`/dashboard/wallet/credit/${credits[rowId]?.id}`}
            createRoute="/dashboard/wallet/credit/create"
            setDownloadCredit={() => {
              setShowDownload(!showDownload)
            }}
            handleRefinance={() => {
              handleRefinance(credits[rowId].id)
            }}
            downloadCredit={showDownload}
            handleDownloadPdf={async () => {
              await downloadCreditPdf(
                credits[rowId].id,
                context.headers.Authorization
              )
              setShowDownload(false)
            }}
            handleDownloadXlsx={async () => {
              await downloadCreditXlsx(
                credits[rowId].id,
                context.headers.Authorization
              )
              setShowDownload(false)
            }}
            toggleSelect={() => {
              setShowDownload(false)
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

        <div className=" hidden md:flex justify-end">
          <PaginationTable table={table} />
        </div>

        {dataRefinance?.isRefinance.state === false && showWarning ? (
          <AlertModalError value={dataRefinance?.isRefinance.message} />
        ) : (
          errorRefinance && showWarning && <AlertModalError value="Error" />
        )}

        {deleteData?.deleteCredit && showWarningDelete ? (
          <AlertModalSucces value="Se han eliminado el credito" />
        ) : deleteData?.deleteCredit === false && showWarningDelete ? (
          <AlertModalError value="El credito no se puede eliminar" />
        ) : (
          errorDelete && showWarningDelete && <AlertModalError value="Error" />
        )}
      </div>
    </>
  )
}

export default TableCredits
