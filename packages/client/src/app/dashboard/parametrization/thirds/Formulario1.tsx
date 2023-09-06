import InputField from "@/app/components/input/InputField";
import SelectField from "@/app/components/input/SelectField";
import { TypeIdentification, CivilStatus, Gender, HousingType, Studies, FormData } from './types';
import React, { useState } from 'react';
import CheckboxField from "@/app/components/input/CheckboxField";

const Formulario1: React.FC = () => {
   const initialData: FormData = {
      typeIdentification: TypeIdentification.CEDULA_DE_CIUDADANIA,
      expeditionDate: new Date(),
      expeditionCity: '',
      countryCard: '',
      municipalityCard: '',
      cityCard: '',
      name: '',
      lastName: '',
      gender: Gender.MASCULINO,
      statusCivil: CivilStatus.SOLTERO_A,
      addressResidence: '',
      municipality: '',
      city: '',
      phone: 0,
      landLine: 0,
      email: '',
      housingType: HousingType.PROPIA,
      studies: Studies.PRIMARIA,
      profession: '',
      foreignOperations: false,
      publicResources: false,
      publicRecognition: false,
      publicPower: false
   };

   const [data, setData] = useState<FormData>(initialData);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setData(prevData => ({ ...prevData, [name]: value }));
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
   };

   return (
      <div>
         <h1>INFORMACIÓN GENERAL</h1>
         <form onSubmit={handleSubmit}>
            <SelectField
               name="typeIdentification"
               label="Tipo de Identificación"
               value={data.typeIdentification}
               options={[
                  { value: TypeIdentification.CEDULA_DE_CIUDADANIA, label: "Cédula de Ciudadanía" },
                  { value: TypeIdentification.TARJETA_DE_EXTRANJERIA, label: "Tarjeta de Extranjería" }
               ]}
               onChange={handleChange}
            />

            <InputField
               type="date"
               name="expeditionDate"
               label="Fecha de Expedición"
               value={data.expeditionDate?.toISOString().substr(0, 10) || ''}
               onChange={handleChange}
            />

            <InputField
               name="expeditionCity"
               label="Ciudad de Expedición"
               value={data.expeditionCity}
               onChange={handleChange}
            />

            <InputField
               name="countryCard"
               label="País de la Tarjeta"
               value={data.countryCard}
               onChange={handleChange}
            />

            <InputField
               name="municipalityCard"
               label="Municipalidad de la Tarjeta"
               value={data.municipalityCard}
               onChange={handleChange}
            />

            <InputField
               name="cityCard"
               label="Ciudad de la Tarjeta"
               value={data.cityCard}
               onChange={handleChange}
            />

            <InputField
               name="name"
               label="Nombres Completos"
               value={data.name}
               onChange={handleChange}
            />

            <InputField
               name="lastName"
               label="Apellidos Completos"
               value={data.lastName}
               onChange={handleChange}
            />

            <SelectField
               name="gender"
               label="Género"
               value={data.gender}
               options={[
                  { value: Gender.MASCULINO, label: "Masculino" },
                  { value: Gender.FEMENINO, label: "Femenino" }
               ]}
               onChange={handleChange}
            />

            <SelectField
               name="statusCivil"
               label="Estado Civil"
               value={data.statusCivil}
               options={[
                  { value: CivilStatus.SOLTERO_A, label: "Soltero(a)" },
                  // ... y así para todos los valores del enum
               ]}
               onChange={handleChange}
            />

            <InputField
               name="addressResidence"
               label="Dirección de Residencia"
               value={data.addressResidence}
               onChange={handleChange}
            />

            <InputField
               name="municipality"
               label="Ciudad"
               value={data.municipality}
               onChange={handleChange}
            />

            <InputField
               name="city"
               label="Departamento"
               value={data.city}
               onChange={handleChange}
            />

            <InputField
               type="email"
               name="email"
               label="Correo Personal"
               value={data.email}
               onChange={handleChange}
            />

            <InputField
               type="tel"
               name="phone"
               label="Celular"
               value={data.phone.toString()}
               onChange={handleChange}
            />

            <InputField
               type="tel"
               name="landLine"
               label="Teléfono Fijo"
               value={data.landLine.toString()}
               onChange={handleChange}
            />

            <SelectField
               name="housingType"
               label="Tipo de Vivienda"
               value={data.housingType}
               options={[
                  { value: HousingType.PROPIA, label: "Propia" },
                  // ... y así para todos los valores del enum
               ]}
               onChange={handleChange}
            />

            <SelectField
               name="studies"
               label="Estudios"
               value={data.studies}
               options={[
                  { value: Studies.PRIMARIA, label: "Primaria" },
                  // ... y así para todos los valores del enum
               ]}
               onChange={handleChange}
            />

            <InputField
               name="profession"
               label="Profesión"
               value={data.profession}
               onChange={handleChange}
            />

            <CheckboxField
               name="foreignOperations"
               label="¿Realiza operaciones en el exterior?"
               checked={data.foreignOperations}
               onChange={handleChange}
            />

            <CheckboxField
               name="publicResources"
               label="¿Accede a recursos públicos?"
               checked={data.publicResources}
               onChange={handleChange}
            />

            <CheckboxField
               name="publicRecognition"
               label="¿Tiene reconocimiento público?"
               checked={data.publicRecognition}
               onChange={handleChange}
            />

            <CheckboxField
               name="publicPower"
               label="¿Posee poder público?"
               checked={data.publicPower}
               onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary">Enviar</button>
         </form>
      </div>
   );
}

export default Formulario1;

