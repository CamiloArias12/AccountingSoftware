import InputField from '@/app/components/input/InputField';
import SelectField from '@/app/components/input/SelectField';
import {
  IdentificationForm,
  RegimeForm,
  TypePersonForm,
} from '@/lib/utils/thirds/selectForm';
import React from 'react';

export function FormCompany({
  companyInformation,
  handleChangeCompanyInformation,
  handleCompanyInformation,
  handleChangeCompanyNumber,
}: {
  companyInformation: any;
  handleChangeCompanyInformation: any;
  handleChangeCompanyNumber: any;
  handleCompanyInformation: any;
}) {
  return (
    <div className="flex flex-col m-3">
      <label className="text-center text-white  bg-[#10417B] text-input font-bold mb-2">
        Datos empresa
      </label>
      <InputField
        name="socialReason"
        label="Razón Social"
        value={companyInformation.socialReason}
        onChange={handleChangeCompanyInformation}
      />

      <div className="grid  grid-cols-2 gap-2 my-2">
        <InputField
          name="typeIdentification"
          label="Tipo de Identificación"
          value={companyInformation.typeIdentification}
          onChange={handleChangeCompanyInformation}
        />

        <InputField
          name="numberIdentification"
          label="Número de Identificación"
          value={companyInformation.numberIdentification}
          onChange={handleChangeCompanyInformation}
          onBlur={handleChangeCompanyNumber}
        />

        <SelectField
          name="regime"
          label="Régimen"
          value={companyInformation.regime}
          options={RegimeForm}
          handleGeneralInformation={handleCompanyInformation}
        />

        <SelectField
          name="typePerson"
          label="Tipo de Persona"
          value={companyInformation.typePerson}
          options={TypePersonForm}
          handleGeneralInformation={handleCompanyInformation}
        />
        <InputField
          name="digitVerification"
          label="Dígito de Verificación"
          value={companyInformation.digitVerification}
          onChange={handleChangeCompanyInformation}
          onBlur={handleChangeCompanyNumber}
        />

        <InputField
          name="natureCompany"
          label="Naturaleza de la Empresa"
          value={companyInformation.natureCompany}
          onChange={handleChangeCompanyInformation}
        />
      </div>
      <label className="text-center text-white  bg-[#10417B] text-input font-bold mb-2">
        Datos representante legal
      </label>
      <SelectField
        name="legalRepresentativeTypeIdentificatio"
        label="Tipo de Identificación"
        value={companyInformation.legalRepresentativeTypeIdentificatio}
        options={IdentificationForm}
        handleGeneralInformation={handleCompanyInformation}
      />
      <div className="flex flex-row">
        <InputField
          name="legalRepresentativeName"
          label="Nombres"
          value={companyInformation.legalRepresentativeName}
          onChange={handleChangeCompanyInformation}
        />

        <InputField
          name="legalRepresentativeDocument"
          label="Identificación"
          value={companyInformation.legalRepresentativeDocument}
          onChange={handleChangeCompanyInformation}
        />
      </div>
    </div>
  );
}

export default FormCompany;
