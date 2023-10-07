import { Affiliate } from "@/lib/utils/thirds/types";
import { ColumnDef, Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Table from "../../table/Table";
import { use, useEffect, useMemo, useReducer, useRef, useState, useTransition } from "react";
import { gql,useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useVirtual } from "react-virtual";
import { motion} from "framer-motion"

export const revalidate=0
const UPDATE_STATUS= gql`
mutation ($identification:Int!,$status:Boolean!){
  
  updateStatus(identification:$identification,status:$status) {
    identification
  }
}

`
function TableThirds ({affiliates , setShowOptions,setSelected}:{affiliates:Affiliate[],showOptions:boolean,setShowOptions:any,setSelected:any}){

   
  const [data,setData] = useState<Affiliate[]>(affiliates)

  useEffect (() =>{
   setData(affiliates)
  },[affiliates])
   const rerender = useReducer(() => ({}), {})[1]

      const [updateStatus, {loading,error}] = useMutation(UPDATE_STATUS);
      const route =useRouter()


  const columns = useMemo<ColumnDef<Affiliate>[]>(
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
	 cell : (row:any) => (
	 <div className="py-1">
	    <button className={` py-1 px-4 rounded-[30px] ${row.getValue() ? "bg-[#BAF7D0] text-sm  text-[#306E47]":"bg-[#FECACA] text-sm" }`}
	       onClick={()=>{
		 updateStatus(
		  {
		     variables:{
			identification:row.row._valuesCache.identification,
			status:!row.getValue()
		     }
		  }
		 ).then(()=>{
		    console.log("asjdfasjkld") 
		    route.refresh()
		 }) 
	       }}
	    >{row.getValue() ? "Activo" :"Inactivo"}</button>
	 </div>
	),

        header: 'Estado',
      },

    ],
    []
  )


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
  const [idrow,setIdRow]=useState<string>('')
  const [expanded,setExpanded]=useState<boolean>(false)

  const rowVirtualizer = useVirtual ({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 12,
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
          <tbody className=" text-sm">
            {virtualRows.map(virtualRow => {
              const row = rows[virtualRow.index] as Row<Affiliate>
              return (
	      <>
	       <motion.tr  key={row.id} className=" hover:border-l-4  hover:border-l-[#3C7AC2] ">
                  {row.getVisibleCells().map(cell => {
                    return (
		    <>
                      <td  onClick={() =>{ setShowOptions(true)
			      setSelected(row._valuesCache.identification)
                          cell.column.columnDef.cell,
                          cell.getContext()
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
		</>
              )
            })}
          </tbody>
        </table>
    </div>
  )
}


   


export default TableThirds
