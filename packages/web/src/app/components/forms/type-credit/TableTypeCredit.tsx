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
import { AddSvg } from '../../logo/Add'
import { useRouter } from 'next/navigation'
import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import { TypeCredit } from '@/lib/utils/type-credit/types'
import { gql, useMutation } from '@apollo/client'
import { useTypeCredit } from '@/app/hooks/type-credit/TypeCreditInput'
import InputField from '../../input/InputField'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import OptionsTable from '../../options-table/OptionsTable'
import InputNumber from '../../input/InputNumber'
import ViewTypeCredit from './ViewTypeCredit'
import id from 'date-fns/locale/id'
import TypeCreditUpdate from './TypeCreditUpdate'
import { fuzzyFilter } from '../type-account/TableTypeAccount'

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
  const [selected, setSelected] = useState<number>(0)

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
        id: selected
      }
    })
  }

  return (
    <>
      {showView && <ViewTypeCredit setShow={setShowView} id={selected} />}
      {update && (
        <TypeCreditUpdate setShowModal={setUpdate} idTypeCredit={selected} />
      )}
      <div className="flex fleCuentasx-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] pt-8">
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

        <div className="mx-4 my-2 flex-grow text-sm">
          <table className="w-full table-fixed table  ">
            <thead className="font-medium border-b-2 bg-[#F2F5FA] border-b-[#3C7AC2]">
              {table.getHeaderGroups().map(headerGroup => (
                <tr className="rounded-lg" key={headerGroup.id}>
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
                      className={`${
                        selected === row._valuesCache.id && ' selected '
                      }  hover:border-l-4  hover:border-l-[#3C7AC2] `}
                    >
                      {row.getVisibleCells().map(cell => {
                        return (
                          <>
                            <td
                              onClick={() => {
                                setShowOptions(true)
                                setSelected(Number(row._valuesCache.id))
                              }}
                              className=" px-2 "
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
