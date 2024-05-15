'use client'

import InputField from '@/app/components/input/InputField'
import SelectAffiliate from '@/app/components/input/SelectAffiliate'
import { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@/app/components/input/Button'
import { useRouter } from 'next/navigation'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import AlertModalError from '@/app/components/modal/AlertModalError'
import InputCalendar from '@/app/components/input/Calendar'
import Modal from '../../modal/Modal'
import { useSaving } from '@/app/hooks/saving/SavingInput'
import InputNumber from '../../input/InputNumber'
import { useForm } from 'react-hook-form'
import { FieldRequired } from '@/lib/utils/FieldValidation'
import { LabeTitle } from '../../input/LabelTitle'
import { Token } from '@/app/hooks/TokenContext'

const CREATE_SAVING = gql`
  mutation ($create: CreateSavingInput!) {
    createSaving(createSavingInput: $create)
  }
`
const TYPE_SAVINGS_AFFILIATES = gql`
  query {
    getTypeSavingAll {
      id
      name
    }

    allAfiliates {
      user {
        identification
        name
        lastName
      }
    }
  }
`
export const revalidate = 0
function FormSaving({ setShowModalCreate }: { setShowModalCreate: any }) {
  const { context } = Token()
  const {
    register: informationSaving,
    unregister,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })

  const [
    createSaving,
    { data: dataCreate, loading: loadingCreate, error: errorCreate }
  ] = useMutation(CREATE_SAVING)
  const [showWarning, setShowWarning] = useState(false)
  const route = useRouter()
  const {
    data: dataSavings,
    loading,
    error
  } = useQuery(TYPE_SAVINGS_AFFILIATES, { context })

  const handleCreateSaving = saving => {
    setShowWarning(true)
    createSaving({
      variables: {
        create: {
          qoutaValue: saving.qoutaValue,
          startDate: saving.startDate,
          affiliateId: saving.identification,
          typeSavingId: saving.idTypeSaving
        }
      },
      context
    })
  }

  useEffect(() => {
    if (dataCreate) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dataCreate, errorCreate])

  if (dataCreate?.createSaving && !showWarning) {
    route.push('/dashboard/wallet/saving')
    setShowModalCreate(false)
    route.refresh()
  }
  return (
    <Modal
      size="  md:h-auto bg-white md:min-w-[550px]  md:w-[600px]"
      title="Crear ahorro"
      onClick={() => {
        setShowModalCreate(false)
        route.push('/dashboard/wallet/saving')
      }}
    >
      <>
        <form
          className="flex flex-col py-2 w-full    "
          onSubmit={handleSubmit(handleCreateSaving)}
        >
          <LabeTitle value="Información afiliado" />
          <SelectAffiliate
            label="Identificación"
            name="identification"
            options={dataSavings?.allAfiliates}
            setValue={setValue}
            control={control}
            rules={FieldRequired}
            required
            error={errors?.identification?.message}
            onClick={(option: any) => {
              console.log(option)
              setValue('identification', option.user.identification)
              setValue(
                'nameThird',
                `${option.user.name} ${option.user.lastName}`
              )
            }}
          />
          <InputField
            label="Nombres"
            onlyRead={true}
            props={{
              ...informationSaving('nameThird')
            }}
          />

          <LabeTitle value="Información ahorro" />
          <SelectAffiliate
            label="Tipo de ahorro"
            name="typeSaving"
            options={dataSavings?.getTypeSavingAll}
            setValue={setValue}
            control={control}
            rules={FieldRequired}
            error={errors?.typeSaving?.message}
            required
            onClick={(option: any) => {
              setValue('typeSaving', option.name)
              setValue('idTypeSaving', option.id)
            }}
          />
          <InputCalendar
            name="startDate"
            label="Fecha de inicio"
            control={control}
            required
            rules={FieldRequired}
            error={errors.startDate}
          />

          <InputNumber
            label="Valor aporte mensual"
            name="qoutaValue"
            prefix="$ "
            thousandSeparator=","
            control={control}
            required
            rules={FieldRequired}
            error={errors.qoutaValue}
          />
          <div className="pt-10 flex gap-2 flex-col md:flex-row justify-end">
            <Button
              name="Cancelar"
              background="border border-[#10417B] text-[#10417B]"
              type={'button'}
              onClick={() => {
                setShowModalCreate(false)
              }}
            />

            <Button
              name="Aceptar"
              type={'submit'}
              background="bg-[#10417B] text-white"
            />
          </div>
        </form>
        {dataCreate?.createSaving && showWarning ? (
          <AlertModalSucces value="El ahorro ha sido registrado" />
        ) : dataCreate?.createSaving === false && showWarning ? (
          <AlertModalError value="El ya existe" />
        ) : (
          errorCreate && showWarning && <AlertModalError value="Error" />
        )}
      </>
    </Modal>
  )
}

export default FormSaving
