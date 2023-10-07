import React, { useEffect, useState } from 'react';
import InputField from '../../input/InputField';
import { Beneficiaries } from '@/lib/utils/thirds/types';

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
      <button onClick={addBeneficiary}>Agregar</button>
      {beneficiaryInformation.map((beneficiary:Beneficiaries,index) => (
      
      <div className="flex flex-row w-full">
	 <InputField 
	    label="Nombre"
	    name="name"
	    value={beneficiary.beneficiary.name}
	    onChange={ (e) => {
	       handleChangeTodo({...beneficiary,beneficiary:{idDocument:beneficiary.beneficiary.idDocument,name:e.target.value}},index)
	    }}
	 />
	 <InputField 
	    label="Identificacion"
	    name="idDocument"
	    value={beneficiary.beneficiary.idDocument}
	    onChange={ (e) => {
	       handleChangeTodo({...beneficiary,beneficiary:{idDocument:e.target.value,name:beneficiary.beneficiary.name}},index)
	    }}

	 />
	 <InputField 
	    label="Porcentage"
	    name="name"
	    value={beneficiary.percentage}
	    onChange={ (e) => {
	       handleChangeTodo({...beneficiary,percentage:e.target.value},index)
	    }}

	 />
	 
	 <button onClick={()=>{handleDelete(index)}}>Eliminar</button>

	 </div>
      ))

      }

      </>
         );
}

export default BeneficiaryInformation;

