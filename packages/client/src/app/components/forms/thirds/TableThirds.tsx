import { Affiliate } from "@/lib/utils/thirds/types";
import { ColumnDef, Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";
import { useVirtual } from 'react-virtual'
import { motion } from "framer-motion";

function TableThirds ({affiliates , showOptions, setShowOptions}:{affiliates:Affiliate[],showOptions:boolean,setShowOptions:any}){
   
   const rerender = React.useReducer(() => ({}), {})[1]

  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns = React.useMemo<ColumnDef<Affiliate>[]>(
    () => [
      {
        accessorKey: 'identification',
        header: 'Identificacion',
      },
      {
        accessorFn: row => `${row.name} ${row.lastName}`,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Nombres</span>,
      },
      {
        accessorKey: 'salary',
        header: () => 'Salario',
      },
      {
        accessorKey: 'phone',
        header: () => <span>Telefono</span>,
      },
      {
        accessorKey: 'city',
        header: 'Ciudad',
      },
      {
        accessorKey: 'status',
        header: 'Estado',
      },

    ],
    []
  )

  const [data, setData] = React.useState<Affiliate[]>(affiliates)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })



 const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtual ({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  return (
      <div className="mx-4 my-2 flex-grow">
        <table className="h-full w-full table-fixed  ">
          <thead className="font-medium border-b-4 bg-[#EEEEEE] border-b-[#3C7AC2]" >
            {table.getHeaderGroups().map(headerGroup => (
              <tr  className="rounded-lg" key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th
		     className="text-start font-light pl-3 font-medium "
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
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
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
              const row = rows[virtualRow.index] as Row<Affiliate>
              return (
                <motion.tr  key={row.id} className=" hover:border-l-4  hover:border-l-[#3C7AC2] ">
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td  onClick={() =>{ setShowOptions(true) }} className="font-light px-2"key={cell.id} >
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
          </tbody>
        </table>
    </div>
  )
}



export default TableThirds
