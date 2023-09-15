"use client"
import BeneficiaryInformation from "@/app/components/forms/thirds/BeneficiaryInformation";
import GeneralInformation from "@/app/components/forms/thirds/GeneralInformation";
import WorkingInformtaion from "@/app/components/forms/thirds/WorkingInformation";
import HeaderModule from "@/app/components/header/HeaderModule";
import ListChange from "@/app/components/list-change/ListChange";
import { FormBeneficiaryInformation } from "@/app/hooks/thirds/BeneficiaryInput";
import { FormGeneralInformation } from "@/app/hooks/thirds/GeneralInput";
import { FormWorkingInformation } from "@/app/hooks/thirds/WorkingInput";
import { CreateCells } from "@/lib/utils/thirds/OptionsThirds";
import { useState } from "react";

function  CreateThird({countries}:{countries:any}){
      const {generalInformation,handleChangeGeneralInformation}=FormGeneralInformation()
      const {workingInformation,handleChangeWorkingInformation}=FormWorkingInformation()
      const { beneficiaryInformation, handleChangeBeneficiaryInformation } = FormBeneficiaryInformation();
      const[indexForm,setIndexForm]= useState<number>(1)
   return (
      <div className=" flex-grow flex flex-col m-4  ">

	    <ListChange indexForm={indexForm} setIndexForm={setIndexForm} list={CreateCells} color="bg-[#006AE7]"/>
	 <div className="flex-grow mb-3 bg-[#FFFFFF] flex rounded-bl-lg rounded-br-lg rounded-tr-lg">
	        {indexForm === 1 && <GeneralInformation countries={countries} generalInformation={generalInformation} handleChangeGeneralInformation={handleChangeGeneralInformation} />}
                {indexForm === 2 && <WorkingInformtaion workingInformation={workingInformation} handleChangeWorkingInformation={handleChangeWorkingInformation} />}
                {indexForm === 3 && <BeneficiaryInformation beneficiaryInformation={beneficiaryInformation} handleChangeBeneficiaryInformation={handleChangeBeneficiaryInformation} />}

	   </div> 
	 </div>
      
   );

}


export default CreateThird
