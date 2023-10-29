"use client"
import TableTypeCredit from "@/app/components/forms/type-credit/TableTypeCredit";
import TypeCreditForm from "@/app/components/forms/type-credit/TypeCreditInformation";
import Modal from "@/app/components/modal/Modal";
import { TypeCredit } from "@/lib/utils/type-credit/types";
import { useRouter, useSearchParams } from "next/navigation"; 
import { useEffect, useState } from "react";

export const revalidate=0
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
	       <TypeCreditForm setShowModalCreate={setShowModalCreate} / >
	 }
	    <TableTypeCredit typeCredits={typeCredits}  setShowModalCreate={setShowModalCreate}/>
	 </div>
	 )

}

export default TypeCredits;

