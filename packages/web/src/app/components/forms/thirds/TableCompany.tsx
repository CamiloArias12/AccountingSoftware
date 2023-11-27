import { Affiliate, Company } from '@/lib/utils/thirds/types'
import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
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

export const revalidate = 0
const UPDATE_STATUS = gql`
  mutation ($identification: Int!, $status: Boolean!) {
    updateStatus(identification: $identification, status: $status) {
      identification
    }
  }
`

const DELETE_USER = gql`
  mutation ($identification: Int!) {
    deleteCompany(identification: $identification)
  }
`

function TableCompany({ companies }: { companies: Company[] }) {
  const [showOptions, setShowOptions] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showView, setShowView] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [userSelected, setCompanySelected] = useState<number>(0)
  const [data, setData] = useState<Company[]>(companies)

  const [updateStatus, { data: statusData, loading, error }] =
    useMutation(UPDATE_STATUS)
  const [
    deleteCompany,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_USER)
  const route = useRouter()

  const deleteCompanyHandle = () => {
    setShowWarning(true)
    deleteCompany({
      variables: {
        identification: userSelected
      }
    })
  }
  const updateCompany = (identification: number, status: boolean) => {
    updateStatus({
      variables: {
        identification: identification,
        status: status
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
        accessorKey: 'socialReason',
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
        accessorKey: 'numberIdentification',
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

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
  })

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()
  const [idrow, setIdRow] = useState<string>('')
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
      <div className="flex flex-grow flex-col bg-white rounded-tr-sm rounded-b-sm ">
        <div className="flex items-center justify-between m-3  ">
          <div>
            {showOptions && (
              <div className="flex flex-row p-2 rounded-sm bg-[#F2F5FA] ">
                <button
                  className="flex flex-row"
                  onClick={() => {
                    setShowView(true)
                  }}
                >
                  <img src="/view.svg" />
                  <label className="font-sans px-6 text-sm">Ver</label>
                </button>
                <button
                  className="flex flex-row"
                  onClick={() => {
                    setShowUpdate(true)
                  }}
                >
                  <img src="/edit.svg" />
                  <label className="font-sans px-6 text-sm">Editar</label>
                </button>
                <button
                  className="flex flex-row"
                  onClick={() => {
                    deleteCompanyHandle()
                  }}
                >
                  <img src="/delete.svg" />
                  <label className="font-sans px-6 text-sm">Eliminar</label>
                </button>
              </div>
            )}
          </div>
          <div
            className="flex flex-row items-center justify-between hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1"
            onClick={() => {
              setShowCreate(true)
            }}
          >
            <div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-8 w-8 bg-[#10417B] ">
              <AddSvg color="#ffffff" />
            </div>
            <label className="pl-2 hidden group-hover:block text-[12px]">
              Crear
            </label>
          </div>
        </div>

        {showUpdate && (
          <UpdateThird
            thirdIdentification={userSelected}
            setShow={setShowUpdate}
          />
        )}
        {showView && (
          <ViewThird thirdIdentification={userSelected} setShow={setShowView} />
        )}

        <div className=" text-sm mx-4  flex-grow">
          <table className=" w-full table-fixed  table ">
            <thead className="font-medium border-b-2 bg-[#F2F5FA] border-b-[#3C7AC2]">
              {table.getHeaderGroups().map(headerGroup => (
                <tr className="rounded-lg" key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        className="text-start font-light pl-3 p-2 font-medium "
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
                        userSelected === row._valuesCache.identification &&
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
                              className="font-light px-2"
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
