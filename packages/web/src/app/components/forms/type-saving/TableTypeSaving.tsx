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
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import { TypeSaving } from '@/lib/utils/type-saving/types'
import { gql, useMutation } from '@apollo/client'
import { useTypeSaving } from '@/app/hooks/type-saving/TypeSavingInput'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import OptionsTable from '../../options-table/OptionsTable'
import ViewTypeSaving from './ViewTypeSaving'
import TypeSavingUpdate from './TypeSavingUpdate'
import { fuzzyFilter } from '../type-account/TableTypeAccount'

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
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 12
  })
  const { virtualItems: virtualRows } = rowVirtualizer

  const [idrow, setIdRow] = useState<string>('')
  const [expanded, setExpanded] = useState<boolean>(false)
  const [update, setUpdate] = useState<boolean>(false)
  const [showView, setShowView] = useState(false)
  const [
    deleteTypeSaving,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_TYPE_SAVING)
  const { typeSaving, handleTypeSaving, setTypeSaving } = useTypeSaving()
  const [selected, setSelected] = useState<number>(0)
  const [
    updateTypeSaving,
    { data: updateData, loading: loadingUpdate, error: errorUpdate }
  ] = useMutation(UPDATE_TYPE_SAVING)
  const [showWarning, setShowWarning] = useState(false)
  const [showWarningUpdate, setShowWarningUpdate] = useState(false)
  useEffect(() => {
    if (deleteData?.deleteTypeSaving) {
      route.refresh()
    }
  }, [deleteData])

  const deleteTypeSavingHandle = () => {
    setShowWarning(true)
    deleteTypeSaving({
      variables: {
        id: selected
      }
    })
  }
  const updateTypeSavingHandle = () => {
    setShowWarningUpdate(true)
    updateTypeSaving({
      variables: {
        data: typeSaving,
        id: selected
      }
    })
  }
  useEffect(() => {
    if (updateData) {
      if (updateData?.updateTypeSaving) {
        setUpdate(false)
        route.refresh()
      }

      console.log('update')
      const timeout = setTimeout(() => {
        setShowWarningUpdate(false)
      }, 3000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [updateData, errorUpdate])

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
      {showView && <ViewTypeSaving id={selected} setShow={setShowView} />}
      {update && (
        <TypeSavingUpdate idTypeSaving={selected} setShow={setUpdate} />
      )}
      <div className="flex fleCuentasx-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] pt-8 ">
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
                              className=" px-2 py-2"
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
