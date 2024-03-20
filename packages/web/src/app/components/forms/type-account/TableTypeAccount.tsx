import { Affiliate } from '@/lib/utils/thirds/types'
import {
  ColumnDef,
  ExpandedState,
  FilterFn,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { GeneralTypeAccount } from '@/lib/utils/type-account/types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import { gql, useMutation } from '@apollo/client'
import UploadAccounts from './UploadAccounts'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import UpdateTypeAccount from './UpdateTypeAccount'
import { downloadPuc } from '@/lib/axios/uploadFiles'
import OptionsTable from '../../options-table/OptionsTable'

import {
  RankingInfo,
  rankItem,
  compareItems
} from '@tanstack/match-sorter-utils'
import InputFieldSearch from '../../input/InputSearch'
import ViewTypeAccount from './ViewTypeAccount'
import { Token } from '@/app/hooks/TokenContext'
const DELETE_ACCOUNT = gql`
  mutation ($code: Int!) {
    deleteAccount(code: $code)
  }
`

const UPDATE_STATE = gql`
  mutation ($code: Float!, $state: Boolean!) {
    updateStatusAccount(code: $code, status: $state)
  }
`

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

function TableTypeAccount({
  typeAccounts,
  setShowModalCreate
}: {
  typeAccounts: GeneralTypeAccount[]
  setShowModalCreate: any
}) {
  const columns = useMemo<ColumnDef<GeneralTypeAccount>[]>(
    () => [
      {
        accessorKey: 'type',
        header: ({ table }) => (
          <>
            <button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler()
              }}
            >
              {table.getIsAllRowsExpanded() ? '👇' : '👉'}
            </button>{' '}
            Tipo
          </>
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`
            }}
          >
            <>
              {row.getCanExpand() ? (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' }
                  }}
                >
                  {row.getIsExpanded() ? '👇' : '👉'}
                </button>
              ) : (
                '🔵'
              )}{' '}
              {getValue()}
            </>
          </div>
        ),
        minSize: 150,
        footer: props => props.column.id
      },

      {
        accessorKey: 'typeAccount.code',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#FAFBD4] `}>
              {row.getValue()}
            </label>
          </div>
        ),

        header: () => 'Código',
        size: 70
      },
      {
        accessorKey: 'typeAccount.name',
        cell: info => info.getValue(),
        header: () => <span>Nombre</span>,
        minSize: 240
      },
      {
        accessorKey: 'typeAccount.nature',

        cell: info => info.getValue(),
        header: () => <span>Naturaleza</span>,
        size: 70
      },
      {
        accessorKey: 'typeAccount.state',
        cell: (row: any) => (
          <div className="py-1">
            <button
              className={` py-1 px-4 font-medium rounded-[30px] ${
                row.getValue()
                  ? 'bg-[#BAF7D0] text-sm  text-[#306E47]'
                  : 'bg-[#FECACA] text-sm'
              }`}
              onClick={() => {
                updateStateHandle(
                  row.row._valuesCache.typeAccount_code,
                  !row.getValue()
                )
              }}
            >
              {row.getValue() ? 'Activa' : 'Inactiva'}
            </button>
          </div>
        ),

        size: 70,
        header: () => <span>Estado</span>
      }
    ],
    []
  )

  const { context } = Token()
  const [data, setData] = useState<GeneralTypeAccount[]>(typeAccounts)
  const [showOptions, setShowOptions] = useState(false)
  const route = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])

  const [globalFilter, setGlobalFilter] = useState('')
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [
    deleteAccount,
    { data: deleteData, loading: loadingDelete, error: errorDelete }
  ] = useMutation(DELETE_ACCOUNT)
  const [
    stateAccount,
    { data: updateState, loading: loadingState, error: errorState }
  ] = useMutation(UPDATE_STATE)
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      sorting,
      expanded,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onExpandedChange: setExpanded,
    getSubRows: row => row.accounts,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    debugTable: true
  })

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10
  })

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  const [values, setValues] = useState(null)
  const [upload, setUpload] = useState<boolean>(false)
  const [view, setView] = useState<boolean>(false)
  const [update, setUpdate] = useState<boolean>(false)
  const [typeAccountSelected, setTypeAccountSelected] = useState<number>(0)
  const [showWarning, setShowWarning] = useState(false)
  const deleteAccountHandle = () => {
    setShowWarning(true)
    deleteAccount({
      variables: {
        code: typeAccountSelected
      },
      context
    })
  }

  const updateStateHandle = (code: number, state: boolean) => {
    setShowWarning(true)
    stateAccount({
      variables: {
        code: code,
        state: state
      },
      context
    })
  }

  useEffect(() => {
    if (deleteData) {
      if (deleteData?.deleteAccount) {
        route.refresh()
        setShowOptions(false)
      }

      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 5000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [deleteData, errorDelete])

  useEffect(() => {
    setData(typeAccounts)
  }, [typeAccounts])

  useEffect(() => {}, [deleteData])
  return (
    <>
      {view && (
        <ViewTypeAccount
          values={values}
          typeAccountSelected={typeAccountSelected}
          setView={setView}
        />
      )}
      {update && (
        <UpdateTypeAccount
          setUpdate={setUpdate}
          typeAccountSelected={typeAccountSelected}
        />
      )}
      {upload && <UploadAccounts setShowModal={setUpload} />}
      <div className="flex h-full w-full flex-col md:shadow-lg bg-white pb-4 rounded-tr-sm rounded-b-sm md:py-8 md:px-4 gap-2 md:gap-4">
        <div className="flex  flex-col">
          <OptionsTable
            setView={setView}
            showOptions={showOptions}
            setImportAccount={() => {
              setUpload(true)
            }}
            setDownloadAccount={() => {
              downloadPuc(context.headers.Authorization)
            }}
            deleteHandle={() => {
              deleteAccountHandle()
            }}
            search={globalFilter}
            setSearch={setGlobalFilter}
            setUpdate={setUpdate}
            setCreate={setShowModalCreate}
          />
        </div>
        <div
          className=" flex  w-screen md:w-auto   overflow-scroll "
          ref={tableContainerRef}
        >
          <table
            className={` h-full flex-grow md:h-10 table-fixed text-input overflow-scroll account-table `}
          >
            <thead className="font-semibold bg-[#F2F5FA]  ">
              {table.getHeaderGroups().map(headerGroup => (
                <tr className="rounded-lg" key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        className="text-start pl-3  font-semibold"
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ minWidth: header.getSize() }}
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
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualRows.map(virtualRow => {
                const row = rows[virtualRow.index] as Row<any>
                return (
                  <>
                    <motion.tr
                      key={row.id}
                      className={` ${
                        typeAccountSelected ===
                          row._valuesCache.typeAccount_code && ' selected '
                      }  cursor-pointer hover:border-l-4  hover:border-l-[#3C7AC2] `}
                    >
                      {row.getVisibleCells().map(cell => {
                        return (
                          <>
                            <td
                              onClick={() => {
                                setShowOptions(true)
                                setTypeAccountSelected(
                                  Number(row._valuesCache.typeAccount_code)
                                )
                                setValues(row._valuesCache)
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

              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {deleteData?.deleteAccount && showWarning ? (
        <AlertModalSucces value="Se ha eliminado la cuenta" />
      ) : deleteData?.deleteAccount === false && showWarning ? (
        <AlertModalError value="La cuenta no se puede eliminar" />
      ) : (
        errorDelete && showWarning && <AlertModalError value="Error" />
      )}
    </>
  )
}

export default TableTypeAccount
