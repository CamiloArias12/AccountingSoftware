'use client'
import { FormCompany } from '@/app/components/forms/thirds/CompanyForm'
import AlertModalError from '@/app/components/modal/AlertModalError'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Modal from '../../modal/Modal'
import Button from '../../input/Button'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Token } from '@/app/hooks/TokenContext'

const UPDATE_COMPANY = gql`
  mutation ($id: Float!, $data: CreateCompanyDto!) {
    updateCompany(id: $id, data: $data)
  }
`
const GET_COMPANY = gql`
  query ($id: Float!) {
    company(numberIdentification: $id) {
      typeIdentification
      identification
      digitVerification
      regime
      typePerson
      name
      legalRepresentativeTypeIdentification
      legalRepresentativeName
      legalRepresentativeDocument
      natureCompany
    }
  }
`

function UpdateThirdCompany({
  setUpdate,
  identification
}: {
  setUpdate: any
  identification: number
}) {
  const { context } = Token()
  const [showWarning, setShowWarning] = useState(false)
  const [
    updateCompany,
    { data: companyData, loading: loadingCompany, error: errorCompany }
  ] = useMutation(UPDATE_COMPANY)
  const { data, error, loading, refetch } = useQuery(GET_COMPANY, {
    variables: { id: identification },
    context
  })

  const {
    register: company,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })

  const handleUpdate = async values => {
    console.log(values)
    setShowWarning(true)
    updateCompany({
      variables: {
        data: values,
        id: identification
      },
      context
    })
  }

  const route = useRouter()
  useEffect(() => {
    if (companyData) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [companyData, errorCompany])

  useEffect(() => {
    if (data) {
      setValue('typeIdentification', data.company.typeIdentification)
      setValue('identification', data.company.identification)
      setValue('digitVerification', data.company.digitVerification)
      setValue('regime', data.company.regime)
      setValue('typePerson', data.company.typePerson)
      setValue('name', data.company.name)
      setValue(
        'legalRepresentativeTypeIdentification',
        data.company.legalRepresentativeTypeIdentification
      )
      setValue('legalRepresentativeName', data.company.legalRepresentativeName)
      setValue(
        'legalRepresentativeDocument',
        data.company.legalRepresentativeDocument
      )
      setValue('natureCompany', data.company.natureCompany)
    }
  }, [data])

  console.log(companyData?.updateCompany)

  if (companyData?.updateCompany && !showWarning) {
    route.refresh()
    setUpdate(false)
  }

  return (
    <Modal
      size="  lg:w-[800px] lg:h-auto overflow-scroll bg-white"
      title="Editar persona juridica"
      onClick={() => {
        setUpdate(false)
      }}
    >
      <form className="flex-grow" onSubmit={handleSubmit(handleUpdate)}>
        <FormCompany
          setValue={setValue}
          control={control}
          errors={errors}
          company={company}
        />

        <div className="pt-10 flex gap-2 flex-col md:flex-row justify-end">
          <Button
            name="Cancelar"
            background="border border-[#10417B] text-[#10417B]"
            onClick={() => {
              setUpdate(false)
            }}
          />
          <Button
            name="Aceptar"
            background="bg-[#10417B] text-white"
            loading={loadingCompany}
            type={'submit'}
          />
        </div>
      </form>

      {companyData?.updateCompany && showWarning ? (
        <AlertModalSucces value="Los datos han sido actualizados" />
      ) : companyData?.updateCompany === false && showWarning ? (
        <AlertModalError value="El tercero ya existe" />
      ) : (
        errorCompany && showWarning && <AlertModalError value="Error" />
      )}
    </Modal>
  )
}

export default UpdateThirdCompany
