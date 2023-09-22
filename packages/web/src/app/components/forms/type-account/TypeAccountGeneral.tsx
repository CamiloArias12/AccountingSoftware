import { useTypeAccount } from "@/app/hooks/type-account/TypeAccountInput";
import TypeAccountForm from "./TypeAccountInformation";
import CheckBoxThirds from "../../input/CheckBoxThirds";
import { useState } from "react";
import Button from "../../input/Button";

function TypeAccountGeneral (){
      const [checkedAffiliate,setCheckedAffiliate]= useState<boolean>(false)
      const [checkedEmployee,setCheckedEmployee]= useState<boolean>(false)
      const [checkedProvider,setCheckedProvider]= useState<boolean>(false)

    const { typeAccount, handleTypeAccount } = useTypeAccount();
  return (
      <div className="flex h-full w-full flex-col  ">
	    <div className="flex flex-row bg-[#F2F6F8] mt-3 p-4  rounded-[30px] ">
	       <CheckBoxThirds isChecked={checkedAffiliate} 
		  onChange={()=> {
		     setCheckedAffiliate(!checkedAffiliate)
		 		  		  }} 
		  name="Clase"/>
	       <CheckBoxThirds isChecked={checkedEmployee} 
		  onChange={()=> {
		     setCheckedEmployee(!checkedEmployee)
		 		  		  }} 
		  name="Grupo"/>
	       <CheckBoxThirds isChecked={checkedProvider} 
		  onChange={()=> {
		     setCheckedProvider(!checkedProvider)
		 		  		  }} 
		  name="Cuenta"/>
	       <CheckBoxThirds isChecked={checkedAffiliate} 
		  onChange={()=> {
		     setCheckedAffiliate(!checkedAffiliate)
		 		  		  }} 
		  name="Subcuenta"/>
	       <CheckBoxThirds isChecked={checkedEmployee} 
		  onChange={()=> {
		     setCheckedEmployee(!checkedEmployee)
		 		  		  }} 
		  name="Auxiliar"/>
	    </div> 
                <TypeAccountForm typeAccount={typeAccount} handleChangeTypeAccount={handleTypeAccount} />
	       <div className="pt-10 flex justify-end">
		  <div className="pr-4">
		     <Button name="Cancelar" background="border border-[#10417B] text-[#10417B]"/>
		  </div>
	        <Button name="Aceptar" background="bg-[#10417B] text-white"/>
	    </div>

      </div>

  ) 

}


export default TypeAccountGeneral
