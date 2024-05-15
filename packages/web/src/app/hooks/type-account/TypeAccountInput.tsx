import { TypeAccounnt } from '@/lib/utils/type-account/types';
import { useState } from 'react';

export function useTypeAccount() {

 //@ts-ignore
  const [typeAccount, setTypeAccount] = useState({
    code: '',
    name: '',
    nature: '',
  });

  const handleTypeAccount = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setTypeAccount((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleChangeTypeAccount = (name: string, value: any) => {
    setTypeAccount((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleNumber = (name: string, value: string) => {
    if (!isNaN(Number(value))) {
      setTypeAccount((prevData) => ({ ...prevData, [name]: Number(value) }));
      return true;
    }
    return false;
  };

  return {
    typeAccount,
    setTypeAccount,
    handleTypeAccount,
    handleChangeTypeAccount,
    handleNumber,
  };
}
