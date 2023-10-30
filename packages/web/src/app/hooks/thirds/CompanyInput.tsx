import { useState } from 'react';

export function useCompany() {
  const [companyInformation, setCompanyInformation] = useState({
    typeIdentification: '',
    numberIdentification: 0,
    digitVerification: 0,
    regime: '',
    typePerson: '',
    socialReason: '',
    legalRepresentativeTypeIdentificatio: '',
    legalRepresentativeName: '',
    legalRepresentativeDocument: '',
    natureCompany: '',
  });

  const handleChangeCompanyInformation = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setCompanyInformation((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCompanyInformation = (name: string, value: string) => {
    setCompanyInformation((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeCompanyNubmer = (name: string, value: string) => {
    if (!isNaN(Number(value))) {
      setCompanyInformation((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
      return true;
    }
    return false;
  };

  return {
    companyInformation,
    handleChangeCompanyInformation,
    setCompanyInformation,
    handleChangeCompanyNubmer,
    handleCompanyInformation,
  };
}
