"use client"
import BeneficiaryInformation from "@/app/components/forms/thirds/BeneficiaryInformation";
import GeneralInformation from "@/app/components/forms/thirds/GeneralInformation";
import ProviderCompany from "@/app/components/forms/thirds/ProviderCompany";
import WorkingInformtaion from "@/app/components/forms/thirds/WorkingInformation";
import { FormBeneficiaryInformation } from "@/app/hooks/thirds/BeneficiaryInput";
import { FormCompanyInformation } from "@/app/hooks/thirds/CompanyInput";
import { FormGeneralInformation } from "@/app/hooks/thirds/GeneralInput";
import { FormWorkingInformation } from "@/app/hooks/thirds/WorkingInput";
import { useState } from "react";

function  CreateThird({countries}:{countries:any}){
      const {generalInformation,handleChangeGeneralInformation}=FormGeneralInformation()
      const {workingInformation,handleChangeWorkingInformation}=FormWorkingInformation()
      const { beneficiaryInformation, handleChangeBeneficiaryInformation } = FormBeneficiaryInformation();
      const[indexForm,setIndexForm]= useState<number>(1)
   return (
      <div className=" w-full h-full flex flex-col items-center justify-center ">
	 <div className="flex flex-row items-center justify-center w-full border-b-4 border-[#006AE7] py-2" >
	   <label className=" font-bold">TERCEROS</label> 
	 </div>
	 <div className="w-[95%]">
	    <ul className="flex flex-row w-full">
                <li className={`flex-grow  px-5 pt-5 text-center ${indexForm === 1 ? "bg-[#F9F9F9] border-b-4": "bg-[#FFFFFF]"}`} onClick={() => setIndexForm(1)}>Informacion general</li>
                <li className={`flex-grow  px-5 pt-5 text-center ${indexForm === 2 ? "bg-[#F9F9F9] border-b-4 " : "bg-[#FFFFFF]"}`} onClick={() => setIndexForm(2)}>Informacion laboral</li>
                <li className={`flex-grow  px-5 pt-5 text-center ${indexForm === 3 ? "bg-[#F9F9F9] border-b-4" : "bg-[#FFFFFF]" }`} onClick={() => setIndexForm(3)}>Beneficiarios</li>
	    </ul>
	 </div>
	 <div className="w-[95%] h-[95%] mb-3 bg-[#F9F9F9] flex items-center justify-center rounded-br-lg">
	        {indexForm === 1 && <GeneralInformation countries={countries} generalInformation={generalInformation} handleChangeGeneralInformation={handleChangeGeneralInformation} />}
                {indexForm === 2 && <WorkingInformtaion workingInformation={workingInformation} handleChangeWorkingInformation={handleChangeWorkingInformation} />}
                {indexForm === 3 && <BeneficiaryInformation beneficiaryInformation={beneficiaryInformation} handleChangeBeneficiaryInformation={handleChangeBeneficiaryInformation} />}

	   </div> 
	 </div>
      
   );

}


export default CreateThird
