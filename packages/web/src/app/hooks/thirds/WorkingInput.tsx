import { IAfiliate } from '@/lib/utils/thirds/types';
import { useState } from 'react';

export function FormWorkingInformation() {
  const [workingInformation, setWorkingInformation] = useState<IAfiliate>({
    company: '',
    addreesCompany: '',
    jobTitle: '',
    incomeCompany: new Date(),
    emailJob: '',
    phone: '',
    salary: '',
    bank: '',
    typeAccount: '',
    numberAccount: '',
  });

  const handleChangeWorkingInformation = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setWorkingInformation((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleWorkingNumber = (name: string, value: string) => {
    if (!isNaN(Number(value))) {
      setWorkingInformation((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
      return true;
    }
    return false;
  };
  const handleWorkingInformation = (name: string, value: string) => {
    setWorkingInformation((prevData) => ({ ...prevData, [name]: value }));
  };

  return {
    setWorkingInformation,
    handleWorkingNumber,
    handleWorkingInformation,
    workingInformation,
    handleChangeWorkingInformation,
  };
}
