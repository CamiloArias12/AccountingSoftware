import { Affiliate } from "@/lib/utils/thirds/types";
import { ColumnDef, ExpandedState, Row, SortingState, flexRender, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { GeneralTypeAccount, TypeAccounnt } from "@/lib/utils/type-account/types";
import { HTMLProps, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { AddSvg } from "../../logo/Add";
import { useRouter } from "next/navigation";
import { useVirtual } from "react-virtual";
import { motion} from "framer-motion"
import { gql,useMutation } from "@apollo/client";
import { useTypeAccount } from "@/app/hooks/type-account/TypeAccountInput";
import InputField from "../../input/InputField";
import SelectField from "../../input/SelectField";
import { optionsNature } from "@/lib/utils/type-account/options";
import UploadAccounts from "./UploadAccounts";
import AlertModalSucces from "../../modal/AlertModalSucces";
import AlertModalError from "../../modal/AlertModalError";





const DELETE_ACCOUNT =gql `
mutation ($code:Int!){
  deleteAccount(code:$code)
}

`

const UPDATE_ACCOUNT =gql `
mutation ($updateTypeAccount:TypeAccountInput!,$code:Float!){
  updateAccount(updateTypeAccount:$updateTypeAccount,code:$code)
}

`
const UPDATE_STATE =gql `
mutation($code:Float!,$state:Boolean!){
	updateStatusAccount(code:$code,status:$state)
  
}
`
function TableTypeAccount({typeAccounts ,setShowModalCreate}:{typeAccounts:GeneralTypeAccount[],setShowModalCreate:any}){
  

  const columns = useMemo<ColumnDef<GeneralTypeAccount>[]>(
    () => [
	 {
            accessorKey: 'type',
            header: ({ table }) => (
              <>
              
                <button
                  {...{
                    onClick: table.getToggleAllRowsExpandedHandler(),
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
                  // Since rows are flattened by default,
                  // we can use the row.depth property
                  // and paddingLeft to visually indicate the depth
                  // of the row
                  paddingLeft: `${row.depth * 2}rem`,
                }}
              >
                <>
                   
                  {row.getCanExpand() ? (
                    <button
                      {...{
                        onClick: row.getToggleExpandedHandler(),
                        style: { cursor: 'pointer' },
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
	    size:50,
            footer: props => props.column.id,
          },



      {
        accessorKey: 'typeAccount.code',
	 cell : (row:any) => (
	 <div className="py-1">
	    <label className={` py-1 px-4 rounded-[30px] bg-[#78EEFE] `}>{row.getValue()}</label>
	 </div>
	),

        header: () => 'Codigo',
	size:50,
      },
      {
        accessorKey: 'typeAccount.name',
        cell: info => info.getValue(),
        header: () => <span>Nombre</span>,
      },
      {
        accessorKey: 'typeAccount.nature',

        cell: info => info.getValue(),
        header: () => <span>Naturaleza</span>,
	size:50,
      },
      {
        accessorKey: 'typeAccount.state',
	cell : (row:any) => (
	 <div className="py-1">
	 
	    <button  className={` py-1 px-4 rounded-[30px] ${row.getValue() ? "bg-[#BAF7D0] text-sm  text-[#306E47]":"bg-[#FECACA] text-sm" }`}
	       onClick={()=>{
		 console.log( row.r)
		 updateStateHandle(
			row.row._valuesCache.typeAccount_code,
			!row.getValue()
		 ) 
	       }}
	    >{ row.getValue() ? "Activa" :"Inactiva"}</button>
	 </div>
	),

	 size:50,
        header: () => <span>Estado</span>,
      }

    ],
    []
  )

  const [data ,setData] = useState<GeneralTypeAccount[]>(typeAccounts)
   const [showOptions,setShowOptions]=useState(false)
   const route =useRouter()
   const [sorting, setSorting] = useState<SortingState>([])

  const [expanded, setExpanded] = useState<ExpandedState>({})
   const [deleteAccount, {data:deleteData,loading:loadingDelete,error:errorDelete}] = useMutation(DELETE_ACCOUNT);
   const [updateAccount, {data:updateData,loading:loadingUpdate,error:errorUpdate}] = useMutation(UPDATE_ACCOUNT);
   const [stateAccount, {data:updateState,loading:loadingState,error:errorState}] = useMutation(UPDATE_STATE);
   const table = useReactTable({

    data,
    columns,
    state: {
      sorting,
      expanded,
    },
    onExpandedChange:setExpanded,
    getSubRows:row => row.accounts,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel:getExpandedRowModel(),

    debugTable: true,
    
  })



   const tableContainerRef = useRef<HTMLDivElement>(null)

   const { rows } = table.getRowModel()
  
   const rowVirtualizer = useVirtual ({
      parentRef: tableContainerRef,
      size: rows.length,
      overscan: 10,
   })

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
   const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
   const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0


   const [idrow,setIdRow]=useState<string>('')
   const [upload,setUpload]=useState<boolean>(false)
   const [expandedA,setExpandedA]=useState<boolean>(false)
   const [value,setValue]= useState<String>('')
   const [update,setUpdate]=useState<boolean>(false)
   const [typeAccountSelected,setTypeAccountSelected]=useState<number>(0)
    const { typeAccount,setTypeAccount, handleTypeAccount,handleChangeTypeAccount,handleNumber } = useTypeAccount();
   const [showWarning, setShowWarning] = useState(false);
   const [showWarningUpdate, setShowWarningUpdate] = useState(false);
   const deleteAccountHandle =() =>{
      setShowWarning(true)
      deleteAccount(
	 {
	    variables:{
		  code:typeAccountSelected
	    }
	 }
      )
   
   }



 const updateAccountHandle =() =>{
   setShowWarningUpdate(true)
      updateAccount(
	 {
	    variables:{
		  updateTypeAccount:typeAccount, 
		  code:typeAccountSelected
	    }
	 }
      )
   
   }
 
 const updateStateHandle =(code:number,state:boolean) =>{
   setShowWarning(true)
     stateAccount(
	 {
	    variables:{
		  code:code,
		  state:state
	    }
	 }
      )
   
   }
 useEffect(() => {
    if (updateData) {
      if(updateData?.updateAccount){
	 setUpdate(false)
	 route.refresh()
      }

      console.log("update")
      const timeout = setTimeout(() => {
	 setShowWarningUpdate(false)
      }, 3000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [updateData,errorUpdate]);

useEffect(() => {
    if (deleteData) {
      if(deleteData?.deleteAccount){
	 route.refresh()
      }

      console.log("delete")
      const timeout = setTimeout(() => {
	 setShowWarning(false)
      }, 5000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [deleteData,errorDelete]);

 useEffect (() =>{
   setData(typeAccounts)
  },[typeAccounts])


   useEffect (() => {

   },[deleteData])


      console.log("delete",showWarning)
  return (
      <>
	{upload && <UploadAccounts setShowModal={setUpload}/> } 
      <div className="flex flex-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">	  
	    <div className="flex items-center justify-between m-3  " >
	       <div>
	       {showOptions &&
		     <div className="flex flex-row p-2 rounded-sm bg-[#F2F5FA] rounded-sm">
			<button className="flex flex-row" 
			   onClick={() =>{
			      setUpdate(true)
			   }}>
			   <img  src="/edit.svg"/>
			   <label className="font-sans px-6 text-sm">Editar</label>
			</button>
			<button className="flex flex-row"
			   onClick={() =>{
			      deleteAccountHandle()
			   }}>
			   <img  src="/delete.svg"/>
			   <label className="font-sans px-6 text-sm">Eliminar</label>
			</button>

		     </div>
		  }
	         </div>
	    <div className=" text-sm flex flex-row rounded-sm bg-[#F2F5FA] pr-4 p-2">
	        <div className="flex flex-row items-center justify-between cursor-pointer  " 
		     onClick={() =>{
			setUpload(true)
			}}>
	       
			<div className="flex mx-4 group-hover:text-blue items-center justify-center rounded-[50%] h-[24px] w-[24px] ">
			   <img src="/upload.svg"  /> 
			</div>
			Importar
	        </div>

	       <div className="flex flex-row items-center cursor-pointer " 
		     onClick={() =>{
			setShowModalCreate(true)
			}}>
	       
			<div className=" mx-4 flex group-hover:text-blue items-center justify-center rounded-[50%] h-[24px] w-[24px]  bg-[#10417B] ">
			   <AddSvg color="#ffffff" /> 
			</div>
			Crear
	       </div>
	    </div>
	 </div>
       
      <div className=" flex  mx-4 my-2 overflow-scroll text-sm"
        ref={tableContainerRef}
      >
        <table className="w-full table-fixed account-table ">
          <thead className="font-medium border-b-2 bg-[#F2F5FA] border-b-[#3C7AC2] " >
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

	    {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map(virtualRow => {
              const row = rows[virtualRow.index] as Row<any>
              return (
	      <>
	      {(row.id==idrow && update )?
		  <tr className=" min-h-24 border-b-2 border-[#8C4708] px-2 ">
		     <td className="px-2 bg-white">
			{value}
		     </td>
		     <td className="bg-white">
			<InputField
                        name="code"
                        label=""
                        value={typeAccount.code || ''}
                        onChange={handleTypeAccount}
			onBlur={handleNumber}
                    />


                   </td>
		   <td className="px-2 bg-white">
		      <InputField
                        name="name"
                        label=""
                        value={typeAccount.name}
                        onChange={handleTypeAccount}
			/>
		     </td>
		     <td className="px-2 bg-white">
			<SelectField
			   name="nature"
			   options={optionsNature}	
			   label=""
			   value={String(typeAccount.nature)}
			   handleGeneralInformation={handleChangeTypeAccount}
			 />
		     </td>
		     <td className="flex flex-col h-24 justify-center items-center bg-white">
			<button className="h-[20px] w-[20px] mb-2"
			   onClick={() =>{
			      updateAccountHandle()
			   }}
			>
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
	       <motion.tr  key={row.id} className={` ${typeAccountSelected===row._valuesCache.typeAccount_code && " selected "}  cursor-pointer hover:border-l-4  hover:border-l-[#3C7AC2] `}>
                  {row.getVisibleCells().map(cell => {
                    return (
		    <>
                      <td  onClick={() =>{ 
			   setShowOptions(true)
			   if(!update){
			      console.log(value)
			      setValue(String(row._valuesCache.type))
			      setTypeAccount({code:Number(row._valuesCache.typeAccount_code),name:String(row._valuesCache.typeAccount_name),nature:String(row._valuesCache.typeAccount_nature)})
			      setTypeAccountSelected(Number(row._valuesCache.typeAccount_code))
			      }

			   console.log(row._valuesCache)
			 if(update===false){  
			   if(idrow==row.id){
			      setIdRow(row.id)
			      setExpandedA(!expandedA)
			   }else {
			      
			      setExpandedA(false)
			      setIdRow(row.id)
			      setExpandedA(!true)
			   }
			   }

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
	        }
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
	 {(updateData?.updateAccount===true&& showWarningUpdate) ?
	    <AlertModalSucces value="Se han actualizado los datos"/>
	    : (updateData?.updateAccount===false && showWarningUpdate) ?
	    <AlertModalError value="Los datos no se pueden actualizar"/>
	    : (errorUpdate&& showWarningUpdate) &&
	    <AlertModalError value="Error"/>
	    }
	 {(deleteData?.deleteAccount&& showWarning) ?
	    <AlertModalSucces value="Se han eliminado la cuenta"/>
	    : (deleteData?.deleteAccount===false && showWarning) ?
	    <AlertModalError value="La cuenta no se puede eliminar"/>
	    : (errorDelete&& showWarning) &&
	    <AlertModalError value="Error"/>
	    }

      </>

  );

}

export default TableTypeAccount
