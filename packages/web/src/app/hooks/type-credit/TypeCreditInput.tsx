import { TypeAccounnt } from '@/lib/utils/type-account/types';
import { useState } from 'react';

export function useTypeCredit() {

 //@ts-ignore
  const [typeCredit, setTypeCredit] = useState({
    name: '',
    interest: '',
  });
  const handleTypeCredit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTypeCredit((prevData) => ({ ...prevData, [name]: value }));
  };
   return {
    typeCredit,
    setTypeCredit,
    handleTypeCredit,
  };
}
