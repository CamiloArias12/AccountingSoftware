import { useState } from 'react';

export function useCredit() {
  const [credit, setCredit] = useState({
    nameAffiliate: '',
    identification: 0,
    creditValue: 0,
    typeCredit: '',
    startDate: new Date(),
    discountDate: new Date(),
    interest: 0,
    interestAnual: '',
    installments: 0,
    scheduledPayment: '',
    idTypeCredit: 0,
    previewBalance: 0,
    newBalance: '',
    concept: '',
  });

  const handleCredit = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setCredit((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleCreditSelect = (name: string, value: any) => {
    console.log(name, value);
    setCredit((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreditNumber = (name: string, value: any) => {
    if (!isNaN(Number(value))) {
      setCredit((prevData) => ({ ...prevData, [name]: Number(value) }));
      if (name === 'newBalance' || name === 'previewBalance') {
        setCredit({
          ...credit,
          creditValue:
            Number(credit.previewBalance) + Number(credit.newBalance),
        });
      }

      return true;
    }
    return false;
  };

  return {
    credit,
    handleCredit,
    handleCreditSelect,
    handleCreditNumber,
    setCredit,
  };
}
