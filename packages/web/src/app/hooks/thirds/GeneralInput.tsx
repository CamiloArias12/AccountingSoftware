import { GeneralInformationData } from '@/lib/utils/thirds/types'
import { parse } from 'path'
import { useState } from 'react'

export function FormGeneralInformation() {
  //@ts-ignore
  const [generalInformation, setGeneralInformation] = useState({
    typeIdentification: null,
    identification: null,
    name: null,
    lastName: null,
    expeditionDate: new Date(),
    expeditionCity: null,
    birthDate: new Date(),
    countryBirth: null,
    stateBirth: null,
    cityBirth: null,
    gender: null,
    statusCivil: null,
    addressResidence: null,
    countryResidence: null,
    stateResidence: null,
    cityResidence: null,
    phone: null,
    landLine: null,
    email: null,
    housingType: null,
    studies: null,
    profession: null,
    foreignOperations: false,
    publicResources: false,
    publicRecognition: false,
    publicPower: false
  })

  const handleChangeGeneralInformation = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    if (value === '') {
      setGeneralInformation({ ...generalInformation, [name]: null })
    } else {
      setGeneralInformation({ ...generalInformation, [name]: value })
    }
  }

  const handleGeneralInformation = (name: string, value: string) => {
    if (value === '') {
      setGeneralInformation({ ...generalInformation, [name]: null })
    } else {
      setGeneralInformation({ ...generalInformation, [name]: value })
    }
  }

  return {
    generalInformation,
    setGeneralInformation,
    handleChangeGeneralInformation,
    handleGeneralInformation
  }
}
