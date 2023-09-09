import InputField from "@/app/components/input/InputField";
import SelectField from "@/app/components/input/SelectField";
import CheckboxField from "@/app/components/input/CheckboxField";
import { CivilStatusForm, GenderForm, HousingTypeForm, IdentificationForm, StudiesForm } from "@/lib/utils/thirds/selectForm";
import SelectFieldTest from "../../input/SelectFieldSearch";


export function GeneralInformation({ generalInformation, handleChangeGeneralInformation,countries }: { generalInformation: any, handleChangeGeneralInformation: any,countries:any }) {

   return (
      <div className="flex flex-col justify-center">
        <div className="py-6">
                </div>
         <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
	    <SelectField
	       name="typeIdentification"
	       label="Tipo de Identificación"
	       value={generalInformation.typeIdentification}
	       options={IdentificationForm}
	       onChange={handleChangeGeneralInformation}
	    />

	    <InputField
               name="names"
               label="Nombres"
               value={generalInformation.expeditionCity}
               onChange={handleChangeGeneralInformation}
            />
	    <InputField
               name="last"
               label="Apellidos"
               value={generalInformation.expeditionCity}
               onChange={handleChangeGeneralInformation}
            />

	    <SelectFieldTest options={countries} />
            <InputField
               type="date"
               name="expeditionDate"
               label="Fecha de Expedición"
               value={generalInformation.expeditionDate?.toISOString().substr(0, 10) || ''}
               onChange={handleChangeGeneralInformation}
            />

	    <SelectField
               name="Pais de expedicion"
               label="Estudios"
               value={generalInformation.studies}
               options={countries}
               onChange={handleChangeGeneralInformation}
            />
	     <InputField
               name="expeditionCity"
               label="Ciudad de Expedición"
               value={generalInformation.expeditionCity}
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
               options={GenderForm}
               onChange={handleChangeGeneralInformation}
            />

            <SelectField
               name="statusCivil"
               label="Estado Civil"
               value={generalInformation.statusCivil}
               options={CivilStatusForm}
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
               options={HousingTypeForm}
               onChange={handleChangeGeneralInformation}
            />

            <SelectField
               name="studies"
               label="Estudios"
               value={generalInformation.studies}
               options={StudiesForm}
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

