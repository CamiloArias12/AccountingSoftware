import { GeneralInformationData } from '@/lib/utils/thirds/types';
import { parse } from 'path';
import { useState } from 'react';

export function FormGeneralInformation() {
  const [generalInformation, setGeneralInformation] =
    useState<GeneralInformationData>({
      typeIdentification: '',
      identification: 0,
      name: '',
      lastName: '',
      expeditionDate: new Date(),
      expeditionCity: '',
      birthDate: new Date(),
      countryBirth: 'Colombia',
      stateBirth: '',
      cityBirth: '',
      gender: '',
      statusCivil: '',
      addressResidence: '',
      countryResidence: 'Colombia',
      stateResidence: '',
      cityResidence: '',
      phone: '',
      landLine: '',
      email: '',
      housingType: '',
      studies: '',
      profession: '',
      foreignOperations: false,
      publicResources: false,
      publicRecognition: false,
      publicPower: false,
    });

  const handleChangeGeneralInformation = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setGeneralInformation({ ...generalInformation, [name]: value });
  };

  const handleGeneralInformation = (name: string, value: string) => {
    setGeneralInformation((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleGeneralNumber = (name: string, value: string) => {
    if (!isNaN(Number(value))) {
      setGeneralInformation((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
      return true;
    }
    return false;
  };

  return {
    generalInformation,
    handleGeneralNumber,
    setGeneralInformation,
    handleChangeGeneralInformation,
    handleGeneralInformation,
  };
}
