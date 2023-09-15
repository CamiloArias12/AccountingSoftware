
"use client"

import Table from "@/app/components/forms/thirds/TableThirds"
import TableThirds from "@/app/components/forms/thirds/TableThirds"
import HeaderModule from "@/app/components/header/HeaderModule"
import ListChange from "@/app/components/list-change/ListChange"
import { AddSvg } from "@/app/components/logo/Add"
import Logo from "@/app/components/logo/Logo"
import { ThirdsCells } from "@/lib/utils/thirds/OptionsThirds"
import { Affiliate } from "@/lib/utils/thirds/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const revalidate=0

function Thirds ( {affiliates}:{affiliates:Affiliate[]}){
   const [index,setIndex]=useState(1)
   const [showOptions,setShowOptions]=useState(false)
   const route =useRouter()
   return (
      <div className="flex flex-col flex-grow m-4 ">
	 <ListChange indexForm={index} setIndexForm={setIndex} list={ThirdsCells} color="bg-[#3C7AC2]"/>
	 <div className="flex flex-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">	  
	    <div className="flex items-center justify-end w-1/3  " >
	       <div className="flex flex-row items-center hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1" onClick={() =>{route.push("thirds/create")}}>
		  <div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-8 w-8 bg-[#3C7AC2] ">
			<AddSvg color="#ffffff" /> 
		     </div>
			<label className="pl-2 hidden group-hover:block text-[12px]">Crear</label>
		  </div>
		  {showOptions &&
		     <div>
			<button>U</button>
			<button>U</button>
			<button>U</button>
		     </div>
		  }
	       </div>
		  <Table affiliates={affiliates} showOptions={showOptions} setShowOptions={setShowOptions} />

	    </div>
	 </div>
   )

}



export default Thirds
