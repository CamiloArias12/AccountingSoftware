
"use client"

import Table from "@/app/components/forms/thirds/TableThirds"
import ListChange from "@/app/components/list-change/ListChange"
import { AddSvg } from "@/app/components/logo/Add"
import { Affiliate } from "@/lib/utils/thirds/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CreateThird from "./create/CreateThird"
import Modal from "@/app/components/modal/Modal"
import { ThirdsType } from "@/lib/utils/thirds/OptionsThirds"

export const revalidate=0

function Thirds ( {affiliates}:{affiliates:Affiliate[]}){
   const [index,setIndex]=useState(1)
   const [showOptions,setShowOptions]=useState(false)
   const [showModal,setShowModal]=useState(false)
   const route =useRouter()
   return (
      <div className="flex flex-col flex-grow mx-4 mt-16">
	 <ListChange indexForm={index} setIndexForm={setIndex} list={ThirdsType} color="bg-[#3C7AC2]"/>
	 <div className="flex flex-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">	  
	    <div className="flex items-center justify-between m-3  " >
	       <div>
	       {showOptions &&
		     <div className="flex flex-row p-2 rounded-[40px] bg-[#F2F5FA] ">
			<button className="flex flex-row" onClick={() =>{ setShowModal(true)}}>
			   <img  src="/view.svg"/>
			   <label className="font-sans px-6 text-sm">Ver</label>
			</button>
			<button className="flex flex-row" onClick={() =>{ setShowModal(true)}}>
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
  
	       <div className="flex flex-row items-center justify-between hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1" onClick={() =>{route.push("thirds/create")}}>
	       
			<div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-8 w-8 bg-[#10417B] ">
			   <AddSvg color="#ffffff" /> 
			</div>
			<label className="pl-2 hidden group-hover:block text-[12px]">Crear</label>
		     </div>
		  </div>
		  
		  <Table affiliates={affiliates} showOptions={showOptions} setShowOptions={setShowOptions} />

	    </div>

	    {showModal &&
	       <Modal 
	       title="Actualizar afiliado"
	       size="w-[80%] h-[90%]"
	       onClick={() =>{ setShowModal(false)}}
	       children={<CreateThird/>}
	       />
	    }
	 </div>
   )

}



export default Thirds
