import { TypeAccounnt } from "@/lib/utils/type-account/types";
import { useState } from "react";

export function useTypeCredit() {
  const [typeCredit, setTypeCredit] = useState({
        name: '',interest:0
    });
  const handleTypeCredit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTypeCredit(prevData => ({ ...prevData, [name]: value }));
    };
   const handleNumber = (name:string ,value:string) => {
      if(!(isNaN(Number(value)))){
      setTypeCredit(prevData => ({ ...prevData, [name]:Number(value) }));
	 return true;
      }
      return false;
   };

   return {
      typeCredit,
      setTypeCredit,
      handleTypeCredit,
      handleNumber
   };
}
