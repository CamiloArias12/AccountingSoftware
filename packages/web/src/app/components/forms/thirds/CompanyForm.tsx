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
import { LabeTitle } from '../../input/LabelTitle'

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
    <div className="flex flex-col m-1 md:m-3">
      <LabeTitle value="Información empresa" />
      <InputField
        name="name"
        label="Razón social"
        required
        props={{ ...company('name', FieldRequired) }}
        error={errors.name}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
        <InputField
          name="typeIdentification"
          label="Tipo de identificación"
          required
          props={{ ...company('typeIdentification', FieldRequired) }}
          error={errors.typeIdentification}
        />

        <InputNumber
          name="identification"
          label="Número de identificación"
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
          label="Tipo de persona"
          options={TypePersonForm}
          setValue={setValue}
          control={control}
          required
          rules={FieldRequired}
          error={errors.typePerson}
        />
        <InputNumber
          name="digitVerification"
          label="Dígito de verificación"
          control={control}
          error={errors.digitVerification}
          required
          rules={FieldRequired}
        />

        <InputField
          name="natureCompany"
          label="Naturaleza de la empresa"
          required
          props={{ ...company('natureCompany', FieldRequired) }}
          error={errors.typeIdentification}
        />
      </div>

      <LabeTitle value="Información representante legal" />

      <SelectField
        name="legalRepresentativeTypeIdentification"
        label="Tipo de identificación"
        options={IdentificationForm}
        setValue={setValue}
        required
        control={control}
        rules={FieldRequired}
        error={errors?.legalRepresentativeTypeIdentification}
      />
      <div className="flex gap-2  flex-col md:flex-row">
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
