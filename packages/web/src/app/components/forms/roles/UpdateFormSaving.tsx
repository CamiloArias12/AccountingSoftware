'use client'

import InputField from '@/app/components/input/InputField'
import { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@/app/components/input/Button'
import { useRouter } from 'next/navigation'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import AlertModalError from '@/app/components/modal/AlertModalError'
import InputCalendar from '@/app/components/input/Calendar'
import Modal from '../../modal/Modal'
import InputNumber from '../../input/InputNumber'
import { useForm } from 'react-hook-form'
import { FieldRequired } from '@/lib/utils/FieldValidation'

const CREATE_SAVING = gql`
  mutation ($update: UpdateSavingInput!) {
    updateSaving(updateSavingInput: $update)
  }
`
const GET_SAVING = gql`
  query ($id: Int!) {
    getSaving(id: $id) {
      id
      qoutaValue
      startDate
      identification
      lastName
      name
      nameSaving
    }
  }
`
export const revalidate = 0
function UpdateSaving({
  setShowModalUpdate,
  id
}: {
  setShowModalUpdate: any
  id: number
}) {
  const {
    register: informationSaving,
    unregister,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })

  const [
    updateSaving,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }
  ] = useMutation(CREATE_SAVING)
  const [showWarning, setShowWarning] = useState(false)
  const route = useRouter()
  const {
    data: dataSaving,
    loading,
    error,
    refetch
  } = useQuery(GET_SAVING, { variables: { id: id } })

  useEffect(() => {
    if (dataSaving?.getSaving) {
      setValue('identification', dataSaving?.getSaving?.identification)
      setValue(
        'nameThird',
        `${dataSaving?.getSaving?.name} ${dataSaving?.getSaving?.lastName}`
      )
      setValue('typeSaving', dataSaving?.getSaving?.nameSaving)

      const date = dataSaving?.getSaving?.startDate.split('-', 3)
      date &&
        setValue(
          'startDate',
          new Date(
            Number(date[0]),
            Number(date[1]) - 1,
            Number(date[2].split('T', 1))
          )
        )
      setValue('qoutaValue', dataSaving?.getSaving.qoutaValue)
    }
  }, [dataSaving])

  const handleUpdateSaving = saving => {
    setShowWarning(true)
    updateSaving({
      variables: {
        update: {
          qoutaValue: saving.qoutaValue,
          id: id
        }
      }
    })
  }

  useEffect(() => {
    if (dataUpdate) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dataUpdate, errorUpdate])

  if (dataUpdate?.updateSaving && !showWarning) {
    route.push('/dashboard/wallet/saving')
    setShowModalUpdate(false)
    route.refresh()
    refetch()
  }
  return (
    <Modal
      size="min-w-[650px] min-h-[500px] bg-white "
      title="Actualizar ahorro"
      onClick={() => {
        setShowModalUpdate(false)
        route.push('/dashboard/wallet/saving')
      }}
    >
      <>
        <form
          className=" flex-grow flex flex-col bg-white h-full m-2  gap-2"
          onSubmit={handleSubmit(handleUpdateSaving)}
        >
          <label className="text-center text-white  bg-[#10417B] text-input font-bold mb-2">
            {' '}
            Información afiliado
          </label>
          <InputField
            label="Identificación"
            onlyRead
            required
            props={{ ...informationSaving('identification') }}
          />
          <InputField
            label="Nombres"
            onlyRead
            props={{ ...informationSaving('nameThird') }}
          />

          <label className="text-center text-white  bg-[#10417B] text-input font-bold my-2">
            {' '}
            Información ahorro
          </label>
          <InputField
            label="Tipo de ahorro"
            props={{ ...informationSaving('typeSaving') }}
            onlyRead
          />

          <InputCalendar
            name="startDate"
            label="Fecha de inicio"
            control={control}
            onlyRead
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
                setShowModalUpdate(false)
              }}
            />

            <Button
              name="Aceptar"
              type={'submit'}
              background="bg-[#10417B] text-white"
            />
          </div>
        </form>
        {dataUpdate?.updateSaving && showWarning ? (
          <AlertModalSucces value="El ahorro ha sido actualizado" />
        ) : dataUpdate?.updateSaving === false && showWarning ? (
          <AlertModalError value="No se ha podido actualizar" />
        ) : (
          errorUpdate && showWarning && <AlertModalError value="Error" />
        )}
      </>
    </Modal>
  )
}

export default UpdateSaving
