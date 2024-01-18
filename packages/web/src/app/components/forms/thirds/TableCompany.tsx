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
import { AddSvg } from '../../logo/Add'
import UpdateThird from './UpdateThird'
import ViewThird from './ViewThird'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import CreateThirdCompany from './CreateCompany'
import OptionsTable from '../../options-table/OptionsTable'
import UpdateThirdCompany from './UpdateCompany'
import { fuzzyFilter } from '../type-account/TableTypeAccount'

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
  const [companySelected, setCompanySelected] = useState<number>(0)
  const [data, setData] = useState<Company[]>(companies)

  const [updateStatus, { data: statusData, loading, error }] =
    useMutation(UPDATE_STATUS)
  const [
    deleteCompany,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_COMPANY)
  const route = useRouter()

  const deleteCompanyHandle = () => {
    setShowWarning(true)
    deleteCompany({
      variables: {
        id: companySelected
      }
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
          identification={companySelected}
          setUpdate={setShowUpdate}
        />
      )}

      <div className="flex flex-grow flex-col bg-white rounded-tr-sm rounded-b-sm py-8 px-4  gap-4">
        <OptionsTable
          showOptions={showOptions}
          setView={setShowView}
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

        <div className=" text-sm mx-4  flex-grow">
          <table className=" w-full table-fixed  table ">
            <thead className="font-medium border-b-2 bg-[#F2F5FA] border-b-[#3C7AC2]">
              {table.getHeaderGroups().map(headerGroup => (
                <tr className="rounded-lg" key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        className="text-start   p-2 font-medium "
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
            <tbody className=" text-sm">
              {virtualRows.map(virtualRow => {
                const row = rows[virtualRow.index] as Row<Company>
                return (
                  <>
                    <motion.tr
                      key={row.id}
                      className={`${
                        companySelected === row._valuesCache.identification &&
                        ' selected '
                      } hover:border-l-4  hover:border-l-[#3C7AC2] `}
                    >
                      {row.getVisibleCells().map(cell => {
                        return (
                          <>
                            <td
                              onClick={() => {
                                setShowOptions(true)
                                setCompanySelected(
                                  Number(row._valuesCache.identification)
                                )
                                cell.column.columnDef.cell, cell.getContext()
                              }}
                              className=" p-2"
                              key={cell.id}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          </>
                        )
                      })}
                    </motion.tr>
                  </>
                )
              })}
            </tbody>
          </table>
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
