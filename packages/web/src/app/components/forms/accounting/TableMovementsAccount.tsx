import {
  ColumnDef,
  Row,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useVirtual } from 'react-virtual'
import { motion } from 'framer-motion'
import { MovementAccount } from '@/lib/utils/accounting/types'
import { fuzzyFilter } from '../type-account/TableTypeAccount'

function TableMovementsAccount({
  movementAccounts
}: {
  movementAccounts: MovementAccount[]
}) {
  const columnHelper = createColumnHelper<MovementAccount>()
  console.log(movementAccounts)
  const columns = useMemo<ColumnDef<MovementAccount>[]>(
    () => [
      columnHelper.group({
        id: 'afiliate',
        header: () => 'Cuenta',
        enableResizing: true,
        columns: [
          {
            accessorKey: 'code',
            cell: info => info.getValue(),
            header: () => <span>Codigo</span>,
            size: 50
          },
          {
            accessorKey: 'nameAccount',
            cell: info => info.getValue(),
            header: () => 'Nombre'
          }
        ]
      }),
      columnHelper.group({
        id: 'afiliate',
        header: () => 'Tercero',

        enableResizing: true,
        columns: [
          {
            accessorKey: 'identificationThird',
            cell: (row: any) => <div className="py-1">{row.getValue()}</div>,

            header: () => <span>Identificacion</span>
          },
          {
            accessorKey: 'nameThird',
            cell: info => info.getValue(),
            header: 'Nombre'
          }
        ]
      }),
      columnHelper.group({
        id: 'afiliate',
        header: () => 'Saldo',
        enableResizing: true,
        columns: [
          {
            accessorKey: 'debit',
            cell: (row: any) => '$ ' + row.getValue().toLocaleString(),
            header: () => <span>Debito</span>
          },

          {
            accessorKey: 'credit',
            cell: info => '$ ' + info.getValue().toLocaleString(),
            header: () => <span>Credito</span>
          }
        ]
      })
    ],
    []
  )

  const [data, setData] = useState<MovementAccount[]>(movementAccounts)
  const [showOptions, setShowOptions] = useState(false)
  const route = useRouter()

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
  })
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 12
  })

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  const [id, setId] = useState<number>(0)

  useEffect(() => {
    setData(movementAccounts)
  }, [movementAccounts])

  return (
    <>
      <div className=" flex h-[70%]  overflow-scroll" ref={tableContainerRef}>
        <table className=" w-full table-fixed table-account ">
          <thead className="font-medium ">
            {table.getHeaderGroups().map(headerGroup => (
              <tr className="rounded-lg  " key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th
                      className="text-center  border font-light pl-3 py-2 font-medium "
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
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
                      id === row._valuesCache.id && 'selected'
                    } hover:border-l-4 text-center hover:border-l-[#3C7AC2] `}
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td
                          onClick={() => {
                            setShowOptions(true)

                            setId(Number(row._valuesCache.id))
                          }}
                          className=" px-2"
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
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableMovementsAccount
