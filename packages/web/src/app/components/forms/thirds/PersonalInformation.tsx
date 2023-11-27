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
import InputNumber from '../../input/InputNumber'
import { NumberFormatValues } from 'react-number-format'

interface GeneralInformationProps {
  generalInformation: GeneralInformationData
  handleChangeGeneralInformation: any
  countries: any
  handleGeneralInformation: any
  handleNumber: any
  country: any
  state: any
  setState: any
  setCountry: any
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
  generalInformation,
  handleGeneralInformation,
  handleChangeGeneralInformation,
  countries,
  setCountry,
  setState,
  state,
  country
}: GeneralInformationProps) {
  const { data } = useQuery(STATES, {
    variables: { isoCode: country }
  })
  const { data: dataTown } = useQuery(TOWN, {
    variables: { isoCode: country, isoCodeState: state }
  })

  useEffect(() => {
    countries.find((country: any) => {
      console.log(country, generalInformation.countryResidence)
      if (country.name === generalInformation.countryResidence) {
        console.log(country.name, generalInformation.countryResidence)
        setCountry(country.iso2)
      }
    })
  }, [])

  return (
    <div className=" flex-grow grid grid-cols-2  gap-4 lg:grid-cols-4  ">
      <div className="row-start-1">
        <InputField
          type="text"
          name="addressResidence"
          label="Dirección de Residencia"
          value={generalInformation.addressResidence}
          onChange={handleChangeGeneralInformation}
        />
      </div>

      <div className="row-start-1">
        <SelectField
          name="countryResidence"
          label="País"
          handleGeneralInformation={handleGeneralInformation}
          image={true}
          value={generalInformation.countryResidence}
          options={countries}
          country={country}
          setCountry={setCountry}
        />
      </div>

      <div className="row-start-1">
        <SelectField
          name="stateResidence"
          label="Estado/Departamento"
          handleGeneralInformation={handleGeneralInformation}
          value={generalInformation.stateResidence}
          options={data?.getState}
          setState={setState}
        />
      </div>
      <div className="row-start-1">
        <SelectField
          name="cityResidence"
          label="Municipio/Ciudad"
          handleGeneralInformation={handleGeneralInformation}
          value={generalInformation.cityResidence}
          options={dataTown?.getTown}
        />
      </div>

      <div className="row-start-2">
        <InputField
          type="email"
          name="email"
          label="Correo Personal"
          value={generalInformation.email}
          onChange={handleChangeGeneralInformation}
        />
      </div>
      <div className="row-start-2">
        <InputNumber
          name="phone"
          label="Celular"
          value={generalInformation.phone}
          onChange={true}
          handleChange={values => {
            console.log('value', values)
            handleGeneralInformation('phone', values.value)
          }}
        />
      </div>
      <div className="row-start-2">
        <InputField
          name="landLine"
          label="Teléfono Fijo"
          value={generalInformation.landLine}
          onChange={handleChangeGeneralInformation}
        />
      </div>

      <div className="row-start-3">
        <SelectField
          name="housingType"
          label="Tipo de vivienda"
          value={generalInformation.housingType}
          options={HousingTypeForm}
          handleGeneralInformation={handleGeneralInformation}
          image={false}
        />
      </div>

      <div className="row-start-3">
        <SelectField
          name="studies"
          label="Estudios"
          value={generalInformation.studies}
          options={StudiesForm}
          handleGeneralInformation={handleGeneralInformation}
          image={false}
        />
      </div>

      <div className="row-start-3">
        <InputField
          name="profession"
          label="Profesión"
          value={generalInformation.profession}
          onChange={handleChangeGeneralInformation}
        />
      </div>
      <div className="row-start-4">
        <CheckboxField
          name="foreignOperations"
          label="¿Realiza operaciones en el exterior?"
          isChecked={generalInformation.foreignOperations}
          onChange={handleGeneralInformation}
        />
      </div>
      <div className="row-start-4">
        <CheckboxField
          name="publicResources"
          label="¿Accede a recursos públicos?"
          isChecked={generalInformation.publicResources}
          onChange={handleGeneralInformation}
        />
      </div>
      <div className="row-start-4">
        <CheckboxField
          name="publicRecognition"
          label="¿Tiene reconocimiento público?"
          isChecked={generalInformation.publicRecognition}
          onChange={handleGeneralInformation}
        />
      </div>
      <div className="row-start-4">
        <CheckboxField
          name="publicPower"
          label="¿Posee poder público?"
          isChecked={generalInformation.publicPower}
          onChange={handleGeneralInformation}
        />
      </div>
    </div>
  )
}

export default PersonalInformation
