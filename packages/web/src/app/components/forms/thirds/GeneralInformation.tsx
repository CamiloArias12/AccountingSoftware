import InputField from "@/app/components/input/InputField";
import SelectField from "@/app/components/input/SelectField";
import CheckboxField from "@/app/components/input/CheckboxField";
import { CivilStatusForm, GenderForm, HousingTypeForm, IdentificationForm, StudiesForm } from "@/lib/utils/thirds/selectForm";
import SelectFieldTest from "../../input/SelectFieldSearch";


export function GeneralInformation({ generalInformation, handleChangeGeneralInformation,countries }: { generalInformation: any, handleChangeGeneralInformation: any,countries:any }) {

   return (
         <div className=" flex-grow grid grid-cols-2  gap-4 lg:grid-cols-4 lg:grid-rows-9 m-10">

	 <div className="row-start-1 " >
	    <InputField
               name="names"
               label="Nombres"
               value={generalInformation.expeditionCity}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div>
	    <InputField
               name="last"
               label="Apellidos"
               value={generalInformation.expeditionCity}
               onChange={handleChangeGeneralInformation}
            />
	 </div>

	 <div className="row-start-2">
	    <SelectField
	       name="typeIdentification"
	       label="Tipo de Identificación"
	       value={generalInformation.typeIdentification}
	       options={IdentificationForm}
	       onChange={handleChangeGeneralInformation}
	    />

	 </div>
	 <div className="row-start-2">
            <InputField
               type="number"
               name="identification"
               label="Numero de Identificación"
               value={generalInformation.expeditionDate?.toISOString().substr(0, 10) || ''}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-2">
            <InputField
               type="date"
               name="expeditionDate"
               label="Fecha de Expedición"
               value={generalInformation.expeditionDate?.toISOString().substr(0, 10) || ''}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-2">
            <InputField
               type="text"
               name="expeditionDate"
               label="Ciudad de Expedición"
               value={generalInformation.expeditionDate?.toISOString().substr(0, 10) || ''}
               onChange={handleChangeGeneralInformation}
            />
	 </div>

	 <div className="row-start-3">
            <InputField
               type="date"
               name="expeditionDate"
               label="Fecha de nacimiento"
               value={generalInformation.expeditionDate?.toISOString().substr(0, 10) || ''}
               onChange={handleChangeGeneralInformation}
            />
	 </div>


	 <div className="row-start-4">
	    <SelectFieldTest options={countries} />
	 </div>
	 <div className="row-start-4">
	    <SelectField
               name="Pais de expedicion"
               label="Estado/Departamento"
               value={generalInformation.studies}
               options={countries}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-4">
	    <SelectField
               name="Pais de expedicion"
               label="Ciudad"
               value={generalInformation.studies}
               options={countries}
               onChange={handleChangeGeneralInformation}
            />
	 </div>

	 <div className="row-start-5">

            <SelectField
               name="gender"
               label="Género"
               value={generalInformation.gender}
               options={GenderForm}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-5">

            <SelectField
               name="statusCivil"
               label="Estado Civil"
               value={generalInformation.statusCivil}
               options={CivilStatusForm}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-6">
            <InputField
               name="addressResidence"
               label="Dirección de Residencia"
               value={generalInformation.addressResidence}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-6">
            <InputField
               name="municipality"
               label="Ciudad"
               value={generalInformation.municipality}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-6">
            <InputField
               name="city"
               label="Departamento"
               value={generalInformation.city}
               onChange={handleChangeGeneralInformation}
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
               type="tel"
               name="phone"
               label="Celular"
               value={generalInformation.phone.toString()}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-7">
            <InputField
               type="tel"
               name="landLine"
               label="Teléfono Fijo"
               value={generalInformation.landLine.toString()}
               onChange={handleChangeGeneralInformation}
            />
	 </div>
	 <div className="row-start-[8]">
            <SelectField
               name="housingType"
               label="Tipo de Vivienda"
               value={generalInformation.housingType}
               options={HousingTypeForm}
               onChange={handleChangeGeneralInformation}
            />
	 </div>

	 <div className="row-start-[8]">
            <SelectField
               name="studies"
               label="Estudios"
               value={generalInformation.studies}
               options={StudiesForm}
               onChange={handleChangeGeneralInformation}
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

