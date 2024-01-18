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
  const { saving, handleSaving, handleSavingSelect, handleSavingNumber } =
    useSaving()

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
  } = useQuery(TYPE_SAVINGS_AFFILIATES)

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
      }
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
      size="min-w-[650px] min-h-[500px] bg-white "
      title="Crear ahorro"
      onClick={() => {
        setShowModalCreate(false)
        route.push('/dashboard/wallet/saving')
      }}
    >
      <>
        <form
          className=" flex-grow flex flex-col bg-white h-full m-2  gap-2"
          onSubmit={handleSubmit(handleCreateSaving)}
        >
          <label className="text-center text-white  bg-[#10417B] text-input font-bold mb-2">
            {' '}
            Información afiliado
          </label>
          <SelectAffiliate
            label="Identificación"
            name="identification"
            options={dataSavings?.allAfiliates}
            setValue={setValue}
            control={control}
            rules={FieldRequired}
            required
            error={errors?.identification?.message}
          />
          <InputField
            label="Nombres"
            onlyRead={true}
            props={{
              ...informationSaving('nameThird')
            }}
          />

          <label className="text-center text-white  bg-[#10417B] text-input font-bold my-2">
            {' '}
            Información ahorro
          </label>
          <SelectAffiliate
            label="Tipo de ahorro"
            name="typeSaving"
            options={dataSavings?.getTypeSavingAll}
            setValue={setValue}
            control={control}
            rules={FieldRequired}
            error={errors?.typeSaving?.message}
            required
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
          <div className="mt-8 flex  gap-2 justify-end  ">
            <Button
              name="Cancelar"
              background="border border-[#10417B] text-[#10417B]"
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
