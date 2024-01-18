import { useState } from 'react'

export function useCompany() {
  //@ts-ignore
  const [companyInformation, setCompanyInformation] = useState({
    typeIdentification: '',
    identification: '',
    digitVerification: '',
    regime: '',
    typePerson: '',
    name: '',
    legalRepresentativeTypeIdentificatio: '',
    legalRepresentativeName: '',
    legalRepresentativeDocument: '',
    natureCompany: ''
  })

  const handleChangeCompanyInformation = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setCompanyInformation(prevData => ({ ...prevData, [name]: value }))
  }

  const handleCompanyInformation = (name: string, value: string) => {
    setCompanyInformation(prevData => ({ ...prevData, [name]: value }))
  }

  const handleChangeCompanyNubmer = (name: string, value: string) => {
    if (!isNaN(Number(value))) {
      setCompanyInformation(prevData => ({
        ...prevData,
        [name]: Number(value)
      }))
      return true
    }
    return false
  }

  return {
    companyInformation,
    handleChangeCompanyInformation,
    setCompanyInformation,
    handleChangeCompanyNubmer,
    handleCompanyInformation
  }
}
