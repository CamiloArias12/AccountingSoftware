"use client"
import BeneficiaryInformation from "@/app/components/forms/thirds/BeneficiaryInformation";
import CredentialsForm from "@/app/components/forms/thirds/Credentials";
import GeneralInformation from "@/app/components/forms/thirds/GeneralInformation";
import WorkingInformtaion from "@/app/components/forms/thirds/WorkingInformation";
import Button from "@/app/components/input/Button";
import CheckBoxThirds from "@/app/components/input/CheckBoxThirds";
import ListChange from "@/app/components/list-change/ListChange";
import { FormBeneficiaryInformation } from "@/app/hooks/thirds/BeneficiaryInput";
import { FormGeneralInformation } from "@/app/hooks/thirds/GeneralInput";
import { FormWorkingInformation } from "@/app/hooks/thirds/WorkingInput";
import { OptionsThirds } from "@/lib/utils/thirds/OptionsThirds";
import { GeneralInformationData } from "@/lib/utils/thirds/types";
import { useEffect, useState } from "react";




function  FormThirdNatural({countries,generalInformationData}:{countries:any,generalInformationData?:GeneralInformationData}){
      const {generalInformation,handleChangeGeneralInformation}=FormGeneralInformation({generalInformationData})
      const {workingInformation,handleChangeWorkingInformation}=FormWorkingInformation()
      const { beneficiaryInformation, handleChangeBeneficiaryInformation } = FormBeneficiaryInformation();
      const[indexForm,setIndexForm]= useState<number>(1)
      const [checkedAffiliate,setCheckedAffiliate]= useState<boolean>(false)
      const [checkedEmployee,setCheckedEmployee]= useState<boolean>(false)
      const [checkedProvider,setCheckedProvider]= useState<boolean>(false)
      const [list ,setList]=useState(OptionsThirds)
    
      useEffect( () =>{
	 const updatedList = [...OptionsThirds];
	 console.log(checkedAffiliate)
	 
	 if (checkedAffiliate) {
	    updatedList[1].visible = true;
	    updatedList[3].visible = true;
	 } else {
	    updatedList[1].visible = false;
	    updatedList[3].visible = false;
	 }
      if (checkedEmployee) {
	    updatedList[2].visible = true;
	 }else{
	    updatedList[2].visible = false;
	 }

	   setList(updatedList);
      },[checkedAffiliate,checkedEmployee])

   return (
      <div className="h-full flex-grow flex flex-col">
	   <div className="flex flex-row justify-between"> 
	    <ListChange indexForm={indexForm} setIndexForm={setIndexForm} list={list.filter((option =>(option.visible==true)))} color="bg-[#006AE7]"/>
	    <div className="flex flex-row bg-white pt-3 px-2  rounded-tr-lg rounded-tr-lg rounded-tl-[100px] ">
	       <CheckBoxThirds isChecked={checkedAffiliate} 
		  onChange={()=> {
		     setCheckedAffiliate(!checkedAffiliate)
		 		  		  }} 
		  name="Afiliado"/>
	       <CheckBoxThirds isChecked={checkedEmployee} 
		  onChange={()=> {
		     setCheckedEmployee(!checkedEmployee)
		 		  		  }} 
		  name="Empleado"/>
	       <CheckBoxThirds isChecked={checkedProvider} 
		  onChange={()=> {
		     setCheckedProvider(!checkedProvider)
		 		  		  }} 
		  name="Proveedor"/>

	    </div> 
	    </div>
	 <div className="flex-grow max-h-[95%]  flex flex-col  bg-[#FFFFFF]  rounded-bl-lg rounded-br-lg rounded-tr-lg p-3">
	    <div className="flex-grow overflow-y-scroll ">
	        <GeneralInformation countries={countries} generalInformation={generalInformation} handleChangeGeneralInformation={handleChangeGeneralInformation} />
                {(checkedAffiliate) && <WorkingInformtaion workingInformation={workingInformation} handleChangeWorkingInformation={handleChangeWorkingInformation} />}
                {(checkedAffiliate )&& <BeneficiaryInformation beneficiaryInformation={beneficiaryInformation} handleChangeBeneficiaryInformation={handleChangeBeneficiaryInformation} />}
		{(checkedEmployee)&&<CredentialsForm />}
	   </div>
	 {(checkedAffiliate || checkedEmployee || checkedProvider) &&
	   <div className="pt-10 flex justify-end">
	       <div className="pr-4">
	        <Button name="Cancelar" background="border border-[#10417B] text-[#10417B]"/>
		</div>
	        <Button name="Aceptar" background="bg-[#10417B] text-white"/>
	    </div>
	 }
	   </div>
	 </div>
      
   );

}


export default FormThirdNatural
