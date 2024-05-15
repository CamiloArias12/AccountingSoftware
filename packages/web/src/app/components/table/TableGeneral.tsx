import { Row, flexRender } from '@tanstack/react-table'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useVirtual } from 'react-virtual'

function TableInfo({
  table,
  rowId,
  setRow,
  className,
  setOptions
}: {
  table: any
  rowId: any
  setRow: any
  className: string
  setOptions?: any
}) {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: rows.length
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  return (
    <div
      className=" flex  w-screen md:w-auto   overflow-scroll "
      ref={tableContainerRef}
    >
      <table
        className={` h-full flex-grow md:h-10 table-fixed text-input overflow-scroll ${className} `}
      >
        <thead className="font-medium">
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr className="rounded-lg" key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => {
                return (
                  <th
                    className="text-start pl-3 py-2 font-semibold"
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
              <motion.tr
                key={row.id}
                className={` ${
                  rowId === row.id && ' selected '
                }  cursor-pointer hover:border-l-4  hover:border-l-[#3C7AC2] `}
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <td
                      onClick={() => {
                        setOptions && setOptions(true)
                        setRow(row.id)
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </motion.tr>
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
  )
}

export default TableInfo
