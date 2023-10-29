import { Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { motion} from "framer-motion"
import { useReducer, useRef, useState } from "react"
import { useVirtual } from "react-virtual"

function Table ({columns , data,overscan}:{columns:any,data:any,setShowOptions:any,setSelected:any,overscan:number}){
   
   const rerender = useReducer(() => ({}), {})[1]

  const [sorting, setSorting] = useState<SortingState>([])

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



 const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual ({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: overscan || 12,
  })
  const { virtualItems: virtualRows} = rowVirtualizer

      
  return (
      <div className="mx-4 my-2 flex-grow">
        <table className="h-full w-full table-fixed  ">
          <thead className="font-medium border-b-4 bg-[#F2F5FA] border-b-[#3C7AC2]" >
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
              const row = rows[virtualRow.index] as Row<any>
              return (
	      <>
	       <motion.tr  key={row.id} className="default-table hover:border-l-4  hover:border-l-[#3C7AC2] ">
                  {row.getVisibleCells().map(cell => {
                    return (
		    <>
                      <td  className="font-light px-2"key={cell.id} >
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
  )
}



export default Table
