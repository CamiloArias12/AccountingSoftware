"use client"
import GeneralInformation from "@/app/components/forms/thirds/GeneralInformation";
import WorkingInformtaion from "@/app/components/forms/thirds/WorkingInformation";
import { FormGeneralInformation } from "@/app/hooks/thirds/GeneralInput";
import { FormWorkingInformation } from "@/app/hooks/thirds/WorkingInput";
import { useState } from "react";

function  CreateThird(){
      const {generalInformation,handleChangeGeneralInformation}=FormGeneralInformation()
      const {workingInformation,handleChangeWorkingInformation}=FormWorkingInformation()
     
      const[indexForm,setIndexform]= useState<number>(1)



      
   return (
      <div className="flex flex-col items-center justify-center">
	 <div className="p-10">
	    <button className={`bg-[#16A5FA] p-2 ${indexForm===1 && "bg-[#fff]"}`} onClick={() => {setIndexform(1)}}>Infomacion general</button>  
	    <button className={`bg-[#16A5FA]  p-2 ${indexForm===2 && "bg-[#fff]"}`} onClick={() =>{ setIndexform(2)}}>Informacion laboral</button>  
	    <button  className={`bg-[#16A5FA]  p-2  ${indexForm===3 && "bg-[#fff]"}`} onClick={() => {setIndexform(3)}}>Beneficiarios</button>  
	 </div>
	 <div>
	    {indexForm===1 &&
	       <GeneralInformation generalInformation={generalInformation} handleChangeGeneralInformation={handleChangeGeneralInformation}/>
	    }
	    {indexForm===2 &&
	       <WorkingInformtaion workingInformation={workingInformation} handleChangeWorkingInformation={handleChangeWorkingInformation}/> 
	    }
	    {indexForm===3 &&
	       <div>Beneficiarios</div>
	    }
	 </div>
      </div>

   );

}


export default CreateThird
