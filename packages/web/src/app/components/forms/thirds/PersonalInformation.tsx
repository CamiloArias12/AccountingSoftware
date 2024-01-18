import InputField from '@/app/components/input/InputField'
import CheckboxField from '@/app/components/input/CheckboxField'
import {
  CivilStatusForm,
  GenderForm,
  HousingTypeForm,
  IdentificationForm,
  StudiesForm
} from '@/lib/utils/thirds/selectForm'
import SelectField from '../../input/SelectField'
import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import InputNumber from '../../input/InputNumber'
import { NumberFormatValues } from 'react-number-format'
import { FieldRequired } from '@/lib/utils/FieldValidation'

interface PersonalInformationProps {
  personalInformation: any
  countries: any
  handlePersonalInformation: any
  country: any
  state: any
  setState: any
  setCountry: any
  control: any
  errors: any
  getValues: any
}

const STATES = gql`
  query ($isoCode: String!) {
    getState(isoCode: $isoCode) {
      id
      name
      iso2
    }
  }
`

const TOWN = gql`
  query ($isoCode: String!, $isoCodeState: String!) {
    getTown(isoCodeCountry: $isoCode, isoCodeState: $isoCodeState) {
      id
      name
    }
  }
`

export function PersonalInformation({
  personalInformation,
  handlePersonalInformation,
  countries,
  setCountry,
  setState,
  state,
  country,
  control,
  errors,
  getValues
}: PersonalInformationProps) {
  const { data, loading: loadingState } = useQuery(STATES, {
    variables: { isoCode: country }
  })
  const { data: dataTown, loading: loadingTown } = useQuery(TOWN, {
    variables: { isoCode: country, isoCodeState: state }
  })
  useEffect(() => {
    countries.find((country: any) => {
      if (country.name === personalInformation.countryResidence) {
        setCountry(country.iso2)
      }
    })
  }, [])
  return (
    <div className=" grid grid-cols-2  gap-4 lg:grid-cols-4  ">
      <div className="row-start-1">
        <InputField
          type="text"
          name="addressResidence"
          label="Dirección de Residencia"
          props={{
            ...personalInformation('addressResidence', FieldRequired)
          }}
          required
          error={errors.addressResidence}
        />
      </div>

      <div className="row-start-1">
        <SelectField
          name="countryResidence"
          label="País"
          image={true}
          options={countries}
          country={country}
          setCountry={setCountry}
          control={control}
          setValue={handlePersonalInformation}
          required
          error={errors.countryResidence}
        />
      </div>

      <div className="row-start-1">
        <SelectField
          name="stateResidence"
          label="Estado/Departamento"
          options={data?.getState}
          setState={setState}
          setCountry={setCountry}
          isState
          control={control}
          setValue={handlePersonalInformation}
          required
          error={errors.stateResidence}
        />
      </div>
      <div className="row-start-1">
        <SelectField
          name="cityResidence"
          label="Municipio/Ciudad"
          options={dataTown?.getTown}
          control={control}
          setValue={handlePersonalInformation}
          required
          error={errors.cityResidence}
        />
      </div>

      <div className="row-start-2">
        <InputField
          type="email"
          name="email"
          label="Correo Personal"
          props={{
            ...personalInformation('email')
          }}
          required
          error={errors?.email}
        />
      </div>
      <div className="row-start-2">
        <InputNumber
          name="phone"
          label="Celular"
          onChange={true}
          isString
          control={control}
          error={errors?.phone}
          required
        />
      </div>
      <div className="row-start-2">
        <InputField
          name="landLine"
          label="Teléfono Fijo"
          props={{
            ...personalInformation('landLine', { required: true })
          }}
        />
      </div>

      <div className="row-start-3">
        <SelectField
          name="housingType"
          label="Tipo de vivienda"
          options={HousingTypeForm}
          image={false}
          control={control}
          setValue={handlePersonalInformation}
          required
          error={errors.housingType}
        />
      </div>

      <div className="row-start-3">
        <SelectField
          name="studies"
          label="Estudios"
          options={StudiesForm}
          image={false}
          control={control}
          setValue={handlePersonalInformation}
          required
          error={errors.studies}
        />
      </div>

      <div className="row-start-3">
        <InputField
          name="profession"
          label="Profesión"
          props={{
            ...personalInformation('profession', { required: true })
          }}
          required
        />
      </div>
      <div className="row-start-4">
        <CheckboxField
          name="foreignOperations"
          label="¿Realiza operaciones en el exterior?"
          control={control}
        />
      </div>
      <div className="row-start-4">
        <CheckboxField
          name="publicResources"
          label="¿Accede a recursos públicos?"
          control={control}
        />
      </div>
      <div className="row-start-4">
        <CheckboxField
          name="publicRecognition"
          label="¿Tiene reconocimiento público?"
          control={control}
        />
      </div>
      <div className="row-start-4">
        <CheckboxField
          control={control}
          name="publicPower"
          label="¿Posee poder público?"
        />
      </div>
    </div>
  )
}

export default PersonalInformation
