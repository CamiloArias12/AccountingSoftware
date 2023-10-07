"use client"
import TableTypeCredit from "@/app/components/forms/type-credit/TableTypeCredit";
import TypeCreditForm from "@/app/components/forms/type-credit/TypeCreditInformation";
import Modal from "@/app/components/modal/Modal";
import { TypeCredit } from "@/lib/utils/type-credit/types";
import { useRouter, useSearchParams } from "next/navigation"; 
import { useEffect, useState } from "react";

function TypeCredits({typeCredits}:{typeCredits:TypeCredit[]}) {

      const searchParams = useSearchParams()
      const search = searchParams.get('create')
      const [showModalCreate,setShowModalCreate] =useState<boolean>(false)
      const route = useRouter()
      useEffect (() =>{
      if(search){
	 setShowModalCreate(true)
      }
   },[search])
    return (

        <div className="flex-grow flex h-full">
	 {showModalCreate &&
	    <Modal 
	       size="min-w-[550px] w-[600px]"
	       title="Crear tipo de credito"
	       onClick={() => {
		  setShowModalCreate(false) 
		  route.push("/dashboard/parametrization/typecredit")
		  }}
	    >

	       <TypeCreditForm / >
	    </Modal>
	 }
	    <TableTypeCredit typeCredits={typeCredits}  setShowModalCreate={setShowModalCreate} setSelected={true}/>
	 </div>
	 )

}

export default TypeCredits;

