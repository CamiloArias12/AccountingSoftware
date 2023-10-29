import { ColumnDef, Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useReducer, useRef, useState } from "react";
import { AddSvg } from "../../logo/Add";
import { useRouter } from "next/navigation";
import { useVirtual } from "react-virtual";
import { motion} from "framer-motion"
import { Saving } from "@/lib/utils/savings/types";


function TableSavings({savings,setShowModalCreate}:{savings:Saving[],setShowModalCreate:any}){
  

  console.log(savings)

  const columns = useMemo<ColumnDef<Saving>[]>(
    () => [
      

      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        header: () => <span>Id</span>,
      },
      {
        accessorKey: 'identification',
        cell: info => info.getValue(),
        header: () => 'Identificacion',
      },

      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado',
      },
      {
        accessorKey: 'startDate',
	 cell : (row:any) => (
	 <div className="py-1">
	    <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>{row.getValue()}</label>
	 </div>
	),

        header: () => 'Fecha de inicio',
      },
      {
        accessorKey: 'nameSaving',
        cell: info => info.getValue(),
        header: () => <span>Tipo de ahorro</span>,
      },
      {
        accessorKey: 'qoutaValue',

	cell : (row:any) => (
	 <div className="py-1">
	    <label className={` py-1 px-4 rounded-[30px] bg-[#F2FFA5] `}>{row.getValue()}</label>
	 </div>
	),
        header: () => <span>Valor couta</span>,
      } 
    ],
    []
  )

  const [data ] = useState<Saving[]>(savings)
   const [showOptions,setShowOptions]=useState(false)
   const route =useRouter()
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
      overscan: 14,
   })
   const { virtualItems: virtualRows} = rowVirtualizer

   const [update,setUpdate]=useState<boolean>(false)
   const [selected,setSelected]=useState<number>(0)

  return (
      <>
	 <div className="flex fleCuentasx-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">	  
	    <div className="flex items-center justify-between m-3  " >
	       <div>
	       {showOptions &&
		     <div className="flex flex-row p-2 rounded-lg bg-[#F2F5FA] ">
			<button className="flex flex-row" onClick={() =>{
			      setUpdate(true)
			   }}>
			   <img  src="/edit.svg"/>
			   <label className="font-sans px-6 text-sm">Editar</label>
			</button>
			<button className="flex flex-row">
			   <img  src="/delete.svg"/>
			   <label className="font-sans px-6 text-sm">Eliminar</label>
			</button>

		     </div>
		  }
	         </div>
  
	       <div className="flex flex-row items-center justify-between hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1" 
		     onClick={() =>{
			setShowModalCreate(true)
			}}>
	       
			<div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-8 w-8 bg-[#10417B] ">
			   <AddSvg color="#ffffff" /> 
			</div>
			<label className="pl-2 hidden group-hover:block text-[12px]">Crear</label>
	       </div>

	 </div>
       
      <div className="mx-4 my-2 flex-grow text-sm">
        <table className="w-full table-fixed table ">
          <thead className="font-medium border-b-2 bg-[#F2F5FA] border-b-[#3C7AC2]" >
            {table.getHeaderGroups().map(headerGroup => (
              <tr  className="rounded-lg" key={headerGroup.id}>
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
	        <motion.tr  key={row.id} className={ ` ${selected ===row._valuesCache.id && "selected"} hover:border-l-4  hover:border-l-[#3C7AC2] `}>
                  {row.getVisibleCells().map(cell => {
                    return (
		    <>
                      <td  onClick={() =>{ 
			   setShowOptions(true)
			      setSelected(Number(row._valuesCache.id))

			   }} className="font-light px-2 py-2" key={cell.id} >
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
      </>

  );

}

export default TableSavings 
