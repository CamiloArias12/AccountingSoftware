"use client";
import TableTypeAccount from "@/app/components/forms/type-account/TableTypeAccount";
import TypeAccountGeneral from "@/app/components/forms/type-account/TypeAccountGeneral";
import TypeAccountForm from "@/app/components/forms/type-account/TypeAccountInformation";
import Modal from "@/app/components/modal/Modal";
import SplashScreen from "@/app/components/splash/Splash";
import { useTypeAccount } from "@/app/hooks/type-account/TypeAccountInput";
import { GeneralTypeAccount, TypeAccounnt } from "@/lib/utils/type-account/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export const revalidate=0

function TypeAccounts({typeAccounts}:{typeAccounts:GeneralTypeAccount[]}) {


    const { typeAccount, handleTypeAccount } = useTypeAccount();
    
      const searchParams = useSearchParams()
      const [typeAccountSelected,setTypeAccountSelected]=useState<number>(0)
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
	       size="min-w-[550px] w-[600px]"
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
	    <TableTypeAccount  typeAccounts={typeAccounts} setSelected={setTypeAccountSelected} setShowModalCreate={setShowModalCreate}/ >
	 </div>
        </div>
    );
}

export default TypeAccounts;


