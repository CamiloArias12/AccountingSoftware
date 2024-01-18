import InputField from '@/app/components/input/InputField'
import CheckboxField from '@/app/components/input/CheckboxField'
import {
  CivilStatusForm,
  GenderForm,
  HousingTypeForm,
  IdentificationForm,
  StudiesForm
} from '@/lib/utils/thirds/selectForm'
import { GeneralInformationData } from '@/lib/utils/thirds/types'
import SelectField from '../../input/SelectField'
import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import InputCalendar from '../../input/Calendar'
import InputNumber from '../../input/InputNumber'
import { FieldRequired } from '@/lib/utils/FieldValidation'
interface GeneralInformationProps {
  generalInformation: any
  countries: any
  country: any
  state: any
  setState: any
  setCountry: any
  control: any
  errors: any
  setValue: any
  informationUser?: any
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
export function GeneralInformation({
  generalInformation,
  countries,
  setCountry,
  setState,
  state,
  country,
  control,
  errors,
  setValue,
  informationUser
}: GeneralInformationProps) {
  const { data, loading: loadingState } = useQuery(STATES, {
    variables: { isoCode: country }
  })
  const { data: dataTown, loading: loadingTown } = useQuery(TOWN, {
    variables: { isoCode: country, isoCodeState: state }
  })

  useEffect(() => {
    countries.find((country: any) => {
      if (country.name === generalInformation.countryBirth) {
        setCountry(country.iso2)
      }
    })
  }, [])

  return (
    <div className="  grid grid-cols-2 gap-4 lg:gap-6 lg:grid-cols-4  ">
      <div className="lg:row-start-1 ">
        <InputField
          name="name"
          label="Nombres"
          required
          props={{ ...generalInformation('name', FieldRequired) }}
          error={errors.name}
        />
      </div>
      <div>
        <InputField
          name="lastName"
          label="Apellidos"
          required
          props={{ ...generalInformation('lastName', FieldRequired) }}
          error={errors.lastName}
        />
      </div>
      <div className="lg:row-start-2">
        <SelectField
          name="typeIdentification"
          label="Tipo de Identificación"
          options={IdentificationForm}
          image={false}
          control={control}
          error={errors.typeIdentification}
          setValue={setValue}
        />
      </div>

      <div className="lg:row-start-2">
        <InputNumber
          name="identification"
          label="Numero de Identificación"
          control={control}
          required
          error={errors.identification}
        />
      </div>

      <div className="lg:row-start-3">
        <InputCalendar
          name="expeditionDate"
          label="Fecha de Expedición"
          control={control}
          required
          error={errors.expeditionDate}
        />
      </div>

      <div className="lg:row-start-3">
        <InputField
          type="text"
          name="expeditionCity"
          label="Ciudad de Expedición"
          props={{
            ...generalInformation('expeditionCity', { required: true })
          }}
        />
      </div>

      <div className="lg:row-start-4">
        <InputCalendar
          name="birthDate"
          label="Fecha de nacimiento"
          control={control}
          required
          error={errors.birthDate}
        />
      </div>

      <div className="lg:row-start-4">
        <SelectField
          name="countryBirth"
          label="País"
          setCountry={setCountry}
          image={true}
          options={countries}
          country={country}
          control={control}
          setValue={setValue}
          required
          error={errors.countryBirth}
        />
      </div>

      <div className="lg:row-start-4">
        <SelectField
          name="stateBirth"
          label="Estado/Departamento"
          image={false}
          options={data?.getState}
          setState={setState}
          setCountry={setCountry}
          isState
          control={control}
          setValue={setValue}
          required
          error={errors.stateBirth}
        />
      </div>

      <div className="lg:row-start-4">
        <SelectField
          name="cityBirth"
          label="Municipio/Ciudad"
          image={false}
          options={dataTown?.getTown}
          control={control}
          setValue={setValue}
          required
          error={errors.cityBirth}
        />
      </div>
      <div className="lg:row-start-5">
        <SelectField
          name="gender"
          label="Género"
          value={generalInformation.gender ? generalInformation.gender : ''}
          options={GenderForm}
          image={false}
          control={control}
          setValue={setValue}
          required
          error={errors.gender}
        />
      </div>
      <div className="lg:row-start-5">
        <SelectField
          name="statusCivil"
          label="Estado Civil"
          options={CivilStatusForm}
          control={control}
          setValue={setValue}
          required
          error={errors.statusCivil}
        />
      </div>
    </div>
  )
}

export default GeneralInformation
