'use client'
import { FormCompany } from '@/app/components/forms/thirds/CompanyForm'
import AlertModalError from '@/app/components/modal/AlertModalError'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import { useCompany } from '@/app/hooks/thirds/CompanyInput'
import { OptionsThirds } from '@/lib/utils/thirds/OptionsThirds'
import { gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import Modal from '../../modal/Modal'
import Button from '../../input/Button'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const CREATE_COMPANY = gql`
  mutation ($create: CreateCompanyDto!) {
    createCompany(input: $create)
  }
`

function CreateThirdCompany({ setCreate }: { setCreate: any }) {
  const [showWarning, setShowWarning] = useState(false)
  const [list, setList] = useState(OptionsThirds)
  const [
    createCompany,
    { data: companyData, loading: loadingCompany, error: errorCompany }
  ] = useMutation(CREATE_COMPANY)
  const {
    register: company,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })

  const handleCreate = async values => {
    setShowWarning(true)
    createCompany({
      variables: {
        create: values
      }
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

  console.log(companyData?.createCompany)

  if (companyData?.createCompany && !showWarning) {
    route.refresh()
    setCreate(false)
  }

  return (
    <Modal
      size=" w-screen h-screen lg:w-[800px] lg:h-auto overflow-scroll bg-white"
      title="Crear persona juridica"
      onClick={() => {
        setCreate(false)
      }}
    >
      <form className="flex-grow" onSubmit={handleSubmit(handleCreate)}>
        <FormCompany
          setValue={setValue}
          control={control}
          errors={errors}
          company={company}
        />

        <div className="pt-10 flex justify-end">
          <div className="pr-4">
            <Button
              name="Cancelar"
              background="border border-[#10417B] text-[#10417B]"
            />
          </div>
          <Button
            name="Aceptar"
            background="bg-[#10417B] text-white"
            type={'submit'}
          />
        </div>
      </form>

      {companyData?.createCompany && showWarning ? (
        <AlertModalSucces value="El tercero ha sido registrado" />
      ) : companyData?.createCompany === false && showWarning ? (
        <AlertModalError value="El tercero ya existe" />
      ) : (
        errorCompany && showWarning && <AlertModalError value="Error" />
      )}
    </Modal>
  )
}

export default CreateThirdCompany
