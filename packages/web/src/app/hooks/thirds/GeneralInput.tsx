import { GeneralInformationData } from "@/lib/utils/thirds/types";
import { parse } from "path";
import { useState } from "react"

export function FormGeneralInformation({data}:{data?:GeneralInformationData}) {

   
   const [generalInformation, setGeneralInformation] = useState <GeneralInformationData>(data ? data :{
      typeIdentification: "",
      identification:11,
      name: "JUan",
      lastName:"Arias",
      expeditionDate:new Date(),
      expeditionCity: "Tunja",
      birthDate:new Date(),
      countryBirth:"Colombia",
      stateBirth:"",
      cityBirth:"",
      gender:"",
      statusCivil: "",
      addressResidence: "sadfdsf",
      countryResidence:"Colombia",
      stateResidence:"",
      cityResidence:"",
      phone: '',
      landLine: '',
      email:  'safsdf@gmail.com',
      housingType: '',
      studies: "",
      profession:  '',
      foreignOperations: false,
      publicResources: false,
      publicRecognition: false,
      publicPower: false
   })

   console.log(generalInformation)
   const handleChangeGeneralInformation = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
	    setGeneralInformation({ ...generalInformation, [name]: value});
   };

    const handleGeneralInformation = (name:string ,value:string) => {
      setGeneralInformation(prevData => ({ ...prevData, [name]: value }));
   };
   
   const convertNumber =() =>{
      if(!Number(generalInformation.identification)){
	 return false;
      }else{
	 setGeneralInformation(prevData => ({ ...prevData, identification: parseFloat(generalInformation.identification )}));
	 return true;
	 }
   }
   

   return {
      generalInformation,
      convertNumber,
      setGeneralInformation,
      handleChangeGeneralInformation,
      handleGeneralInformation
   };

}
