import InputField from "@/app/components/input/InputField";
import CheckboxField from "@/app/components/input/CheckboxField";
import { CivilStatusForm, GenderForm, HousingTypeForm, IdentificationForm, StudiesForm } from "@/lib/utils/thirds/selectForm";
import { GeneralInformationData } from "@/lib/utils/thirds/types";
import SelectField from "../../input/SelectField";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import InputCalendar from "../../input/Calendar";


interface GeneralInformationProps {
   generalInformation:GeneralInformationData
   handleChangeGeneralInformation:any
   countries:any
   handleGeneralInformation:any
}

const STATES=gql`query ($isoCode:String!){
   getState(isoCode:$isoCode){
    id
    name
    iso2
  }
}`

const TOWN = gql `query ($isoCode:String!,$isoCodeState:String!){
  getTown(isoCodeCountry:$isoCode,isoCodeState:$isoCodeState){
    id
    name
  
  }
  
}
`



export function GeneralInformation({ generalInformation,handleGeneralInformation ,handleChangeGeneralInformation,countries }:GeneralInformationProps ) {
  
   
   const [country,setCountry]=useState("CO")
   const [state,setState]=useState("")
   const {data}=useQuery(STATES,{
      variables:{ isoCode:country}
   })
   const {data:dataTown}=useQuery(TOWN,{
      variables:{ isoCode:country,isoCodeState:state}
   })


   useEffect( () =>{
    countries.find((country:any) =>{
	 console.log(country,generalInformation.countryBirth)
      if(country.name===generalInformation.countryBirth){
	 console.log(country.name,generalInformation.countryBirth)
	 setCountry(country.iso2)
      };
   })},[])


   useEffect (() => {
      handleGeneralInformation("stateBirth",'')
      handleGeneralInformation("cityBirth",'')
   },[country])
   
   useEffect (() => {
      handleGeneralInformation("cityBirth",'')

   },[state])

   return (
         <div className=" flex-grow grid grid-cols-2  gap-4 lg:grid-cols-4 lg:grid-rows-9 ">

	 <div className="row-start-1 " >
	    <InputField
               name="name"
               label="Nombres"
               value={generalInformation.name}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div>
	    <InputField
               name="lastName"
               label="Apellidos"
               value={generalInformation.lastName}
               onChange={handleChangeGeneralInformation}
            />
	 </div>

	 <div className="row-start-2">
	    <SelectField
	       name="typeIdentification"
	       label="Tipo de Identificación"
	       value={generalInformation.typeIdentification}
	       options={IdentificationForm}
	       handleGeneralInformation={handleGeneralInformation}
	       image={false}
	      
	    />
	 </div>
	 <div className="row-start-2">
            <InputField
               type="number"
               name="identification"
               label="Numero de Identificación"
               value={generalInformation.identification}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-3">
            <InputCalendar
               name="expeditionDate"
               label="Fecha de Expedición"
               value={generalInformation.expeditionDate}
               onChange={handleGeneralInformation}
            />
	 </div>
	 <div className="row-start-3">
            <InputField
               type="text"
               name="expeditionCity"
               label="Ciudad de Expedición"
               value={generalInformation.expeditionCity}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 
	<div className="row-start-4">
            <InputCalendar
               name="expeditionDate"
               label="Fecha de nacimiento"
               value={generalInformation.birthDate}
               onChange={handleGeneralInformation}
            />
	 </div>
	 <div className="row-start-4">
	    <SelectField
               name="countryBirth"
               label="Pais"
	       handleGeneralInformation={handleGeneralInformation}
	       image={true}
               value={generalInformation.countryBirth}
               options={countries}
	       country={country}
	       setCountry={setCountry}
            />
	 </div>

	 <div className="row-start-4">
	    <SelectField
               name="stateBirth"
               label="Estado/Departamento"
	       handleGeneralInformation={handleGeneralInformation}
	       image={false}
               value={generalInformation.stateBirth}
               options={data?.getState}
	       setState={setState}
            />
	 </div>
	  <div className="row-start-4">
	    <SelectField
               name="cityBirth"
               label="Municipio/Ciudad"
	       handleGeneralInformation={handleGeneralInformation}
	       image={false}
               value={generalInformation.cityBirth}
               options={dataTown?.getTown}
            />
	 </div>
	 <div className="row-start-5">

            <SelectField
               name="gender"
               label="Género"
               value={generalInformation.gender}
               options={GenderForm}
	       handleGeneralInformation={handleGeneralInformation}
	       image={false}
            />
	 </div>
	 <div className="row-start-5">

            <SelectField
               name="statusCivil"
               label="Estado Civil"
               value={generalInformation.statusCivil}
               options={CivilStatusForm}
	       handleGeneralInformation={handleGeneralInformation}
	       image={false}
            />
	 </div>

	 <div className="row-start-6">
            <InputField
	       type="text"
               name="addressResidence"
               label="Dirección de Residencia"
               value={generalInformation.addressResidence}
               onChange={handleChangeGeneralInformation}
            />
	 </div>

	 <div className="row-start-6">
	    <SelectField
               name="countryResidence"
               label="Pais"
	       handleGeneralInformation={handleGeneralInformation}
	       image={true}
               value={generalInformation.countryResidence}
               options={countries}
	       country={country}
	       setCountry={setCountry}
            />
	 </div>

	 <div className="row-start-6">
	    <SelectField
               name="stateResidence"
               label="Estado/Departamento"
	       handleGeneralInformation={handleGeneralInformation}
	       image={false}
               value={generalInformation.stateResidence}
               options={data?.getState}
	       setState={setState}
            />
	 </div>
	  <div className="row-start-6">
	    <SelectField
               name="cityResidence"
               label="Municipio/Ciudad"
	       handleGeneralInformation={handleGeneralInformation}
	       image={false}
               value={generalInformation.cityResidence}
               options={dataTown?.getTown}
            />
	 </div>

 
	 <div className="row-start-7">
            <InputField
               type="email"
               name="email"
               label="Correo Personal"
               value={generalInformation.email}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-7">
            <InputField
               type="number"
               name="phone"
               label="Celular"
               value={generalInformation.phone}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-7">
            <InputField
               type="number"
               name="landLine"
               label="Teléfono Fijo"
               value={generalInformation.landLine}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 
	
	 <div className="row-start-[8]">
	    <SelectField
	       name="housingType"
	       label="housingType"
	       value={generalInformation.housingType}
	       options={HousingTypeForm}
	       handleGeneralInformation={handleGeneralInformation}
	       image={false}
	      
	    />

	 </div>

	 <div className="row-start-[8]">
	    <SelectField
	       name="studies"
	       label="Estudios"
	       value={generalInformation.studies}
	       options={StudiesForm}
	       handleGeneralInformation={handleGeneralInformation}
	       image={false}
	      
	    />

	 </div>

	 
	 <div className="row-start-[8]">
            <InputField
               name="profession"
               label="Profesión"
               value={generalInformation.profession}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-[9]">
            <CheckboxField
               name="foreignOperations"
               label="¿Realiza operaciones en el exterior?"
               checked={generalInformation.foreignOperations}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-[9]">
            <CheckboxField
               name="publicResources"
               label="¿Accede a recursos públicos?"
               checked={generalInformation.publicResources}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-[9]">
            <CheckboxField
               name="publicRecognition"
               label="¿Tiene reconocimiento público?"
               checked={generalInformation.publicRecognition}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-[9]">
            <CheckboxField
               name="publicPower"
               label="¿Posee poder público?"
               checked={generalInformation.publicPower}
               onChange={handleChangeGeneralInformation}
            />
	 </div>

         </div>
   );
}

export default GeneralInformation;

