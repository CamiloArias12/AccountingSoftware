"use client"

import InputField from "@/app/components/input/InputField";
import SelectField from "@/app/components/input/SelectField";
import React, { useState } from 'react';
import CheckboxField from "@/app/components/input/CheckboxField";
import { CivilStatus, Gender, HousingType, Studies, TypeIdentification } from "@/lib/utils/thirds/enumThirds";


export function GeneralInformation({generalInformation,handleChangeGeneralInformation}:{generalInformation:any, handleChangeGeneralInformation:any}){
   
   return (
      <div className="flex flex-col items-center justify-center w-full h-full">
	 
            <SelectField
               name="typeIdentification"
               label="Tipo de Identificación"
               value={generalInformation.typeIdentification}
               options={[
                  { value: TypeIdentification.CEDULA_DE_CIUDADANIA, label: "Cédula de Ciudadanía" },
                  { value: TypeIdentification.TARJETA_DE_EXTRANJERIA, label: "Tarjeta de Extranjería" }
               ]}
               onChange={handleChangeGeneralInformation}
            />
	 <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <InputField
               type="date"
               name="expeditionDate"
               label="Fecha de Expedición"
               value={generalInformation.expeditionDate?.toISOString().substr(0, 10) || ''}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               name="expeditionCity"
               label="Ciudad de Expedición"
               value={generalInformation.expeditionCity}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               name="countryCard"
               label="País de la Tarjeta"
               value={generalInformation.countryCard}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               name="municipalityCard"
               label="Municipalidad de la Tarjeta"
               value={generalInformation.municipalityCard}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               name="cityCard"
               label="Ciudad de la Tarjeta"
               value={generalInformation.cityCard}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               name="name"
               label="Nombres Completos"
               value={generalInformation.name}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               name="lastName"
               label="Apellidos Completos"
               value={generalInformation.lastName}
               onChange={handleChangeGeneralInformation}
            />

            <SelectField
               name="gender"
               label="Género"
               value={generalInformation.gender}
               options={[
                  { value: Gender.MASCULINO, label: "Masculino" },
                  { value: Gender.FEMENINO, label: "Femenino" }
               ]}
               onChange={handleChangeGeneralInformation}
            />

            <SelectField
               name="statusCivil"
               label="Estado Civil"
               value={generalInformation.statusCivil}
               options={[
                  { value: CivilStatus.SOLTERO_A, label: "Soltero(a)" },
                  // ... y así para todos los valores del enum
               ]}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               name="addressResidence"
               label="Dirección de Residencia"
               value={generalInformation.addressResidence}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               name="municipality"
               label="Ciudad"
               value={generalInformation.municipality}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               name="city"
               label="Departamento"
               value={generalInformation.city}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               type="email"
               name="email"
               label="Correo Personal"
               value={generalInformation.email}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               type="tel"
               name="phone"
               label="Celular"
               value={generalInformation.phone.toString()}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               type="tel"
               name="landLine"
               label="Teléfono Fijo"
               value={generalInformation.landLine.toString()}
               onChange={handleChangeGeneralInformation}
            />

            <SelectField
               name="housingType"
               label="Tipo de Vivienda"
               value={generalInformation.housingType}
               options={[
                  { value: HousingType.PROPIA, label: "Propia" },
                  // ... y así para todos los valores del enum
               ]}
               onChange={handleChangeGeneralInformation}
            />

            <SelectField
               name="studies"
               label="Estudios"
               value={generalInformation.studies}
               options={[
                  { value: Studies.PRIMARIA, label: "Primaria" },
                  // ... y así para todos los valores del enum
               ]}
               onChange={handleChangeGeneralInformation}
            />

            <InputField
               name="profession"
               label="Profesión"
               value={generalInformation.profession}
               onChange={handleChangeGeneralInformation}
            />

            <CheckboxField
               name="foreignOperations"
               label="¿Realiza operaciones en el exterior?"
               checked={generalInformation.foreignOperations}
               onChange={handleChangeGeneralInformation}
            />

            <CheckboxField
               name="publicResources"
               label="¿Accede a recursos públicos?"
               checked={generalInformation.publicResources}
               onChange={handleChangeGeneralInformation}
            />

            <CheckboxField
               name="publicRecognition"
               label="¿Tiene reconocimiento público?"
               checked={generalInformation.publicRecognition}
               onChange={handleChangeGeneralInformation}
            />

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

