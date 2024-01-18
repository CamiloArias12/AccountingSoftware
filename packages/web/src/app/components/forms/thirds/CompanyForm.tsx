import InputField from '@/app/components/input/InputField'
import SelectField from '@/app/components/input/SelectField'
import {
  IdentificationForm,
  RegimeForm,
  TypePersonForm
} from '@/lib/utils/thirds/selectForm'
import React from 'react'
import InputNumber from '../../input/InputNumber'
import { FieldRequired } from '@/lib/utils/FieldValidation'

export function FormCompany({
  company,
  control,
  setValue,
  errors
}: {
  company: any
  control: any
  setValue: any
  errors: any
}) {
  return (
    <div className="flex flex-col m-3">
      <label className="text-center text-white  bg-[#10417B] text-input font-bold mb-2">
        Datos empresa
      </label>
      <InputField
        name="name"
        label="Razón Social"
        required
        props={{ ...company('name', FieldRequired) }}
        error={errors.name}
      />

      <div className="grid  grid-cols-2 gap-2 my-2">
        <InputField
          name="typeIdentification"
          label="Tipo de Identificación"
          required
          props={{ ...company('typeIdentification', FieldRequired) }}
          error={errors.typeIdentification}
        />

        <InputNumber
          name="identification"
          label="Número de Identificación"
          control={control}
          required
          rules={FieldRequired}
          error={errors.identification}
        />

        <SelectField
          name="regime"
          label="Régimen"
          options={RegimeForm}
          control={control}
          setValue={setValue}
          required
          rules={FieldRequired}
          error={errors.regime}
        />

        <SelectField
          name="typePerson"
          label="Tipo de Persona"
          options={TypePersonForm}
          setValue={setValue}
          control={control}
          required
          rules={FieldRequired}
          error={errors.typePerson}
        />
        <InputNumber
          name="digitVerification"
          label="Dígito de Verificación"
          control={control}
          error={errors.digitVerification}
          required
          rules={FieldRequired}
        />

        <InputField
          name="natureCompany"
          label="Naturaleza de la Empresa"
          required
          props={{ ...company('natureCompany', FieldRequired) }}
          error={errors.typeIdentification}
        />
      </div>
      <label className="text-center text-white  bg-[#10417B] text-input font-bold mb-2">
        Datos representante legal
      </label>
      <SelectField
        name="legalRepresentativeTypeIdentification"
        label="Tipo de Identificación"
        options={IdentificationForm}
        setValue={setValue}
        required
        control={control}
        rules={FieldRequired}
        error={errors?.legalRepresentativeTypeIdentification}
      />
      <div className="flex flex-row">
        <InputField
          name="legalRepresentativeName"
          label="Nombres"
          required
          props={{ ...company('legalRepresentativeName', FieldRequired) }}
          error={errors.name}
        />

        <InputNumber
          name="legalRepresentativeDocument"
          label="Identificación"
          control={control}
          required
          rules={FieldRequired}
          error={errors?.legalRepresentativeDocument}
        />
      </div>
    </div>
  )
}

export default FormCompany
