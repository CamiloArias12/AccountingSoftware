
import { useState } from "react";

export function useSaving() {
const [saving,setSaving]=useState({
      nameAffiliate:'',
      identification:'',
      qoutaValue:"",
      typeSaving:'',
      startDate:new Date(),
      idTypeSaving:0
   })
   
    const handleSaving = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setSaving(prevData => ({ ...prevData, [name]: value }));
    };
   const handleSavingSelect = (name:string,value:any) => {
	 console.log(name,value)
        setSaving(prevData => ({ ...prevData, [name]: value }));
    };
   
   const handleSavingNumber = (name:string,value:any) => {
       if(!(isNaN(Number(value)))){
        setSaving(prevData => ({ ...prevData, [name]: Number(value) }));
	 return true;
      }
      return false;
    };

    return {
        saving,
        handleSaving,
	handleSavingSelect,
	handleSavingNumber,
	setSaving
    };
}




