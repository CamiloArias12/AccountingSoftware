import React, { useEffect, useState } from 'react';
import InputField from '../../input/InputField';
import { Beneficiaries } from '@/lib/utils/thirds/types';
import InputFieldBeneficiary from '../../input/InputBeneficiary';
import { AddSvg } from '../../logo/Add';

export function BeneficiaryInformation({beneficiaryInformation, setBeneficiaryInformation}: 
    {beneficiaryInformation: Beneficiaries[], setBeneficiaryInformation: any}) {
   
      console.log(beneficiaryInformation)
 
      const handleChangeTodo =(beneficiary:Beneficiaries,id:number) => {
      setBeneficiaryInformation(beneficiaryInformation.map((t,index) => {
	 if (index === id) {
	    return beneficiary;
	 } else {
	    return t;
	 }
	 }));
      }
      const handleDelete= (id:number) => {
	 setBeneficiaryInformation(
	 beneficiaryInformation.filter((t,index) => index !== id)
      );
      }

      const addBeneficiary= () => {
	 const beneficiary:Beneficiaries={beneficiary:{name:"" ,idDocument:""},percentage:"" }
	 setBeneficiaryInformation([...beneficiaryInformation,beneficiary])
      }
      
    return (
    <>
      <div className="flex flex-row  mt-4 justify-between " >
      <label className="text-sm font-bold">Beneficiarios</label>
	 <div className=" w-24 flex flex-end items-center  hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1" 
	    onClick={addBeneficiary}>
	    <div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-6 w-6 bg-[#10417B] ">
	       <AddSvg color="#ffffff" /> 
	    </div>
	    <label className="pl-2 hidden group-hover:block text-[12px]">Agregar</label>
	    </div>
	 </div>
      {beneficiaryInformation.map((beneficiary:Beneficiaries,index) => (
      
      <div className="flex flex-row w-full grid lg:grid-cols-4">
	 <InputFieldBeneficiary 
	    label="Nombre"
	    name="name"
	    value={beneficiary.beneficiary.name}
	    onChange={ (e) => {
	       handleChangeTodo({...beneficiary,beneficiary:{idDocument:beneficiary.beneficiary.idDocument,name:e.target.value}},index)
	    }}
	 />
	 <InputFieldBeneficiary 
	    label="Identificacion"
	    name="idDocument"
	    value={beneficiary.beneficiary.idDocument}
	    onChange={ (e) => {
	       handleChangeTodo({...beneficiary,beneficiary:{idDocument:e.target.value,name:beneficiary.beneficiary.name}},index)
	    }}
	  onBlur={ () => {
	       handleChangeTodo({...beneficiary,beneficiary:{idDocument:Number(beneficiary.beneficiary.idDocument),name:beneficiary.beneficiary.name}},index)
	    }}

	 />
	 <InputFieldBeneficiary 
	    label="Porcentage"
	    name="name"
	    value={beneficiary.percentage}
	    onChange={ (e) => {
	       handleChangeTodo({...beneficiary,percentage:e.target.value},index)
	    }}
	    onBlur={ () => {
	       if(isNaN(beneficiary.percentage)){
	       }else{
	       handleChangeTodo({...beneficiary,percentage:Number(beneficiary.percentage)},index)
	       }
	       
	    }}


	 />
	 <button className="flex items-end justify-center h-8 w-8"
		  onClick={()=>{handleDelete(index)}}
	 >
	    
	       <img  src="/delete.svg"/>
	       </button>

	 </div>
      ))

      }

      </>
         );
}

export default BeneficiaryInformation;

