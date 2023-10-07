import { IAfiliate } from "@/lib/utils/thirds/types";
import { useState } from "react"

interface FormWorkingInformationProps {
   workingInformationAffiliate?:IAfiliate

}

export function FormWorkingInformation ({workingInformationAffiliate}:FormWorkingInformationProps){

      const [workingInformation,setWorkingInformation]= useState<IAfiliate>({
         company:'',
         addreesCompany:'',
         jobTitle:'',
         incomeCompany:"",
	 emailJob:'',
         phone: "",
         salary: "",
         bank: '',
         typeAccount:'',
         numberAccount:"",

      })

      const handleChangeWorkingInformation = (event: React.ChangeEvent<HTMLInputElement |HTMLSelectElement>) => {
	    const { name, value } = event.target;
	 setWorkingInformation(prevData => ({ ...prevData, [name]: value }));
   };


   return {
      setWorkingInformation,
      workingInformation,
      handleChangeWorkingInformation
   };

}

