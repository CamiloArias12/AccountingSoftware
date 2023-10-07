"use client"
import TypeCreditForm from "@/app/components/forms/type-credit/TypeCreditInformation";
import TableTypeSaving from "@/app/components/forms/type-saving/TableTypeSaving";
import TypeSavingForm from "@/app/components/forms/type-saving/TypeSavingInformation";
import Modal from "@/app/components/modal/Modal";
import { TypeSaving } from "@/lib/utils/type-saving/types";
import { useRouter, useSearchParams } from "next/navigation"; 
import { useEffect, useState } from "react";

function TypeSavings({typeSavings}:{typeSavings:TypeSaving[]}) {

      console.log("tipos de credito" ,typeSavings)

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
	       title="Crear tipo de ahorro"
	       onClick={() => {
		  setShowModalCreate(false) 
		  route.push("/dashboard/parametrization/typesaving")
		  }}
	    >
	       <TypeSavingForm / >
	    </Modal>
	 }
	    <TableTypeSaving typeSavings={typeSavings} setShowModalCreate={setShowModalCreate} setSelected={true} />
	 </div>
	 )

}

export default TypeSavings;

