import { GeneralInformationData } from "@/lib/utils/thirds/types";
import { useState } from "react"

export function FormGeneralInformation({generalInformationData}:{generalInformationData?:GeneralInformationData}) {

   const [generalInformation, setGeneralInformation] = useState <GeneralInformationData>({
      typeIdentification: generalInformationData?.typeIdentification || '',
      expeditionDate:  generalInformationData?.expeditionDate ||new Date(),
      expeditionCity: generalInformationData?.expeditionCity  ||'',
      countryCard: generalInformationData?.countryCard ||'',
      municipalityCard:generalInformationData?.municipalityCard || '',
      cityCard: generalInformationData?.cityCard || '',
      name: generalInformationData?.name || '',
      lastName: generalInformationData?.lastName || '',
      gender:  generalInformationData?.gender ||'',
      statusCivil: generalInformationData?.statusCivil ||'',
      addressResidence: generalInformationData?.addressResidence ||'',
      municipality: generalInformationData?.municipality || '',
      city: generalInformationData?.city || '',
      phone: generalInformationData?.phone || 0,
      landLine:generalInformationData?.landLine || 0,
      email:  generalInformationData?.email || '',
      housingType: generalInformationData?.housingType ||'',
      studies: generalInformationData?.studies ||'',
      profession: generalInformationData?.profession || '',
      foreignOperations: generalInformationData?.foreignOperations || false,
      publicResources: generalInformationData?.publicResources ||false,
      publicRecognition: generalInformationData?.publicRecognition ||false,
      publicPower: generalInformationData?.publicPower ||false
   })

   const handleChangeGeneralInformation = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setGeneralInformation(prevData => ({ ...prevData, [name]: value }));
   };


   return {
      generalInformation,
      handleChangeGeneralInformation
   };

}
