import { ColumnDef, Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useReducer, useRef, useState } from "react";
import { AddSvg } from "../../logo/Add";
import { useRouter } from "next/navigation";
import { useVirtual } from "react-virtual";
import { motion} from "framer-motion"
import { TypeCredit } from "@/lib/utils/type-credit/types";


function TableTypeCredit({typeCredits ,setSelected,setShowModalCreate}:{typeCredits:TypeCredit[],setShowModalCreate:any,setSelected:any}){
   

   console.log("Types accounts",typeCredits)
  const columns = useMemo<ColumnDef<TypeCredit>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        header: () => <span>Id</span>,
      },
      {
        accessorKey: 'name',
        cell: info => info.getValue(),
        header: () => 'Nombre',
      },
      {
        accessorKey: 'interest',
        cell: info => info.getValue(),
        header: () => <span>Name</span>,
      }
    ],
    []
  )

  const [data ] = useState<TypeCredit[]>(typeCredits)
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
      overscan: 12,
   })
   const { virtualItems: virtualRows} = rowVirtualizer

   const [idrow,setIdRow]=useState<string>('')
   const [expanded,setExpanded]=useState<boolean>(false)
   const [value,setValue]= useState<any>()
   const [update,setUpdate]=useState<boolean>(false)

  return (
      <>
	 <div className="flex fleCuentasx-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">	  
	    <div className="flex items-center justify-between m-3  " >
	       <div>
	       {showOptions &&
		     <div className="flex flex-row p-2 rounded-[40px] bg-[#F2F5FA] ">
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
	      {(row.id==idrow && update )?
		  <tr className=" h-24 border-b-2 border-[#8C4708] px-2 ">
		     <td className="px-2 bg-white">
		     <label>{value.type}</label>
		     </td>
		     <td className="bg-white">
		     <label>{value.code}</label>
		     </td>
		     <td className="px-2 bg-white">
		     <input className="w-full border " value={value.name}/>
		     </td>
		     <td className="px-2 bg-white">
		     <input className="w-full border" value={value.nature}/>
		     </td>
		     <td className="flex flex-col h-24 justify-center items-center bg-white">

			<button className="h-[20px] w-[20px] mb-2">
			   <img src="/accept.png" className="w-full h-full "/>
			</button>
			<button className="h-[20px] w-[20px]" onClick={() => {
			   setUpdate(false)
			}}>
			   <img src="/cancel.png" className="w-full h-full "/>
			</button>

		     </td>
		  </tr>
	       :
	       <motion.tr  key={row.id} className=" hover:border-l-4  hover:border-l-[#3C7AC2] ">
                  {row.getVisibleCells().map(cell => {
                    return (
		    <>
                      <td  onClick={() =>{ 
			   setShowOptions(true)
			   if(!update){
			      setValue({type:row._valuesCache.type,code:row._valuesCache.typeAccount_code,name:row._valuesCache.typeAccount_name,nature:row._valuesCache.typeAccount_nature})
			      }
			   if(row._valuesCache.code){  
			   setSelected(row._valuesCache.code)}
			 if(update===false){  
			   if(idrow==row.id){
			      setIdRow(row.id)
			      setExpanded(!expanded)
			   }else {
			      
			      setExpanded(false)
			      setIdRow(row.id)
			      setExpanded(!true)
			   }
			   }
			   console.log("Flex render",row._valuesCache)

			   }} className="font-light px-2"key={cell.id} >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
				
                      </td>
		      </>
		     )
		     })}
		  </motion.tr>
	        }
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

export default TableTypeCredit
