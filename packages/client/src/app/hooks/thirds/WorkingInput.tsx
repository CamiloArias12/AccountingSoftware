import { useState } from "react"

export function FormWorkingInformation (){

      const [workingInformation,setWorkingInformation]= useState({
      typeIdentification: '',
      expeditionDate: new Date(),
      expeditionCity: '',
      countryCard: '',
      municipalityCard: '',
      cityCard: '',
      name: '',
      lastName: '',
      gender: '',
      statusCivil: '',
      addressResidence: '',
      municipality: '',
      city: '',
      phone: 0,
      landLine: 0,
      email: '',
      housingType: '',
      studies: '',
      profession: '',
      foreignOperations: false,
      publicResources: false,
      publicRecognition: false,
      publicPower: false
      })

      const handleChangeWorkingInformation = (event: React.ChangeEvent<HTMLInputElement |HTMLSelectElement>) => {
	    const { name, value } = event.target;
	 setWorkingInformation(prevData => ({ ...prevData, [name]: value }));
   };


   return {
      workingInformation,
      handleChangeWorkingInformation
   };

}
