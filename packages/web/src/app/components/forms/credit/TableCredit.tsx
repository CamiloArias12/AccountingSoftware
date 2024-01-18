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
import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import { Credit } from '@/lib/utils/credit/types'
import UpdateCredit from './UpdateCredit'
import { gql, useMutation } from '@apollo/client'
import AlertModalError from '../../modal/AlertModalError'
import AlertModalSucces from '../../modal/AlertModalSucces'
import OptionsTable from '../../options-table/OptionsTable'
import { downloadCreditPdf, downloadCreditXlsx } from '@/lib/axios/uploadFiles'
import { fuzzyFilter } from '../type-account/TableTypeAccount'

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
        size: 50
      },
      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado'
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

        header: () => <span>Monto</span>
      },
      {
        accessorKey: 'nameCredit',
        cell: info => info.getValue(),
        header: () => <span>Tipo de crédito</span>
      },
      {
        accessorKey: 'discountDate',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue().split('T', 1)}
            </label>
          </div>
        ),

        header: () => <span>Fecha de descuento</span>
      },
      {
        accessorKey: 'interest',
        cell: info => info.getValue() + ' %',
        header: () => <span>Interés</span>
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
        header: () => <span>Estado</span>
      }
    ],
    []
  )

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
    debugTable: true
  })
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 12
  })
  const { virtualItems: virtualRows } = rowVirtualizer

  const [id, setId] = useState<number>(0)
  const [update, setUpdate] = useState<boolean>(false)
  const [showView, setShowView] = useState<boolean>(false)
  const [showDownload, setShowDownload] = useState<boolean>(false)

  const [showWarning, setShowWarning] = useState(false)
  const [showWarningDelete, setShowWarningDelete] = useState(false)

  useEffect(() => {
    setData(credits)
  }, [credits])

  useEffect(() => {
    if (data) {
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
        id: id
      }
    })
  }

  const handleRefinance = (id: number) => {
    setShowWarning(true)
    isRefinance({
      variables: {
        id: id
      }
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
    route.push(`/dashboard/wallet/credit/refinance/${id}`)
  }

  return (
    <>
      <div className="flex fleCuentasx-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] pt-8">
        <OptionsTable
          showOptions={showOptions}
          deleteHandle={() => {
            deleteCreditHandle()
          }}
          updateRoute={`/dashboard/wallet/credit/update/${id}`}
          viewRoute={`/dashboard/wallet/credit/${id}`}
          createRoute="/dashboard/wallet/credit/create"
          setDownloadCredit={() => {
            setShowDownload(!showDownload)
          }}
          handleRefinance={() => {
            console.log(id)
            handleRefinance(id)
          }}
          downloadCredit={showDownload}
          handleDownloadPdf={async () => {
            await downloadCreditPdf(id)
            setShowDownload(false)
          }}
          handleDownloadXlsx={async () => {
            await downloadCreditXlsx(id)
            setShowDownload(false)
          }}
          toggleSelect={() => {
            setShowDownload(false)
          }}
          search={globalFilter}
          setSearch={setGlobalFilter}
        />

        <div className="mx-4 my-2 flex-grow text-sm">
          <table className="h-full w-full table-fixed table ">
            <thead className="font-medium ">
              {table.getHeaderGroups().map(headerGroup => (
                <tr className="rounded-lg  " key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        className="text-start font-light pl-3 py-2 font-medium "
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler()
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽'
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody className=" ">
              {virtualRows.map(virtualRow => {
                const row = rows[virtualRow.index] as Row<any>
                return (
                  <>
                    <motion.tr
                      key={row.id}
                      className={` ${
                        id === row._valuesCache.id && 'selected'
                      } hover:border-l-4  hover:border-l-[#3C7AC2] `}
                    >
                      {row.getVisibleCells().map(cell => {
                        return (
                          <td
                            onClick={() => {
                              setShowOptions(true)

                              setId(Number(row._valuesCache.id))
                            }}
                            className="px-2 "
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        )
                      })}
                    </motion.tr>
                  </>
                )
              })}
            </tbody>
          </table>
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
