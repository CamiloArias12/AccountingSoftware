"use client";
import TableTypeAccount from "@/app/components/forms/type-account/TableTypeAccount";
import TypeAccountGeneral from "@/app/components/forms/type-account/TypeAccountGeneral";
import TypeAccountForm from "@/app/components/forms/type-account/TypeAccountInformation";
import Modal from "@/app/components/modal/Modal";
import { useTypeAccount } from "@/app/hooks/type-account/TypeAccountInput";
import { TypeAccounnt } from "@/lib/utils/type-account/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const revalidate=0

function CreateTypeAccount({typeAccounts}:{typeAccounts:TypeAccounnt[]}) {


    const { typeAccount, handleTypeAccount } = useTypeAccount();
    
      const searchParams = useSearchParams()
      const [showOptions,setShowOptions]=useState(false)
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
	       size="h-[550px] w-[600px]"
	       title="Crear tipo de cuenta"
	       onClick={() => {
		  setShowModalCreate(false) 
		  route.push("/dashboard/parametrization/typeaccount")
		  }}
	       children ={
		  <TypeAccountGeneral/>
	       }
	    />
	 }
	 <div className="flex-grow h-full">
	    <TableTypeAccount  typeAccounts={typeAccounts} setShowOptions={setShowOptions}/ >
	 </div>
        </div>
    );
}

export default CreateTypeAccount;


